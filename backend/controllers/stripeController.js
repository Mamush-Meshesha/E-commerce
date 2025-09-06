import Stripe from "stripe";
import asyncHandler from "../middleware/asyncHandler.js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_your_stripe_secret_key_here"
);

// Debug: Log the secret key being used (first 10 chars for security)
console.log("Environment variables loaded:");
console.log("STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);
console.log(
  "STRIPE_PUBLISHABLE_KEY exists:",
  !!process.env.STRIPE_PUBLISHABLE_KEY
);
console.log(
  "Stripe Secret Key being used:",
  process.env.STRIPE_SECRET_KEY
    ? process.env.STRIPE_SECRET_KEY.substring(0, 10) + "..."
    : "Using fallback key"
);

// @desc    Create payment intent
// @route   POST /api/stripe/create-payment-intent
// @access  Public (for testing)
export const createPaymentIntent = asyncHandler(async (req, res) => {
  console.log("Creating payment intent with:", req.body);
  const { amount, currency = "usd" } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(400).json({
      message: "Error creating payment intent",
      error: error.message,
    });
  }
});

// @desc    Confirm payment
// @route   POST /api/stripe/confirm-payment
// @access  Private
export const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      paymentIntent,
    });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(400).json({
      message: "Error confirming payment",
      error: error.message,
    });
  }
});

// @desc    Get Stripe publishable key
// @route   GET /api/stripe/config
// @access  Public
export const getStripeConfig = asyncHandler(async (req, res) => {
  res.json({
    publishableKey:
      process.env.STRIPE_PUBLISHABLE_KEY ||
      "pk_test_your_stripe_publishable_key_here",
  });
});
