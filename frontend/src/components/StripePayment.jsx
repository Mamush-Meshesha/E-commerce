import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCreditCard, FaSpinner, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

// Initialize Stripe with publishable key from environment variables
const stripePublishableKey =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
  "pk_test_your_stripe_publishable_key_here";

// Add validation to prevent undefined key
if (
  !stripePublishableKey ||
  stripePublishableKey === "pk_test_your_stripe_publishable_key_here"
) {
  console.warn(
    "Stripe publishable key not found. Please set REACT_APP_STRIPE_PUBLISHABLE_KEY in your .env file"
  );
}

const stripePromise = loadStripe(stripePublishableKey);

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const CheckoutForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Ensure amount is a number
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      console.log("Creating payment intent for amount:", numericAmount);
      const response = await fetch(
        "https://e-commerce-e0of.onrender.com/api/stripe/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // Temporarily removed for testing
          },
          credentials: "omit", // Don't send cookies
          body: JSON.stringify({
            amount: numericAmount,
            currency: "usd",
          }),
        }
      );

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payment intent created:", data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      onError("Failed to initialize payment");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error);
      toast.error(error.message || "Payment failed");
      onError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");
      onSuccess(paymentIntent);
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        style={{
          border: "none",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #635bff 0%, #4f46e5 100%)",
            padding: "1.5rem",
            color: "white",
          }}
        >
          <h5 className="mb-0 fw-bold">
            <FaCreditCard className="me-2" />
            Stripe Payment
          </h5>
          <small>Secure payment with Stripe</small>
        </div>

        <Card.Body className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold text-dark">
                Card Details
              </label>
              <div
                style={{
                  padding: "1rem",
                  border: "2px solid #e9ecef",
                  borderRadius: "10px",
                  background: "#f8f9fa",
                }}
              >
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold text-dark">Total Amount:</span>
              <span
                className="fw-bold text-primary"
                style={{ fontSize: "1.2rem" }}
              >
                ${numericAmount.toFixed(2)}
              </span>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={!stripe || isLoading || !clientSecret}
                className="w-100 py-3 rounded-pill fw-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #635bff 0%, #4f46e5 100%)",
                  border: "none",
                  boxShadow: "0 8px 25px rgba(99, 91, 255, 0.3)",
                }}
              >
                {isLoading ? (
                  <>
                    <FaSpinner
                      className="me-2"
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="me-2" />
                    Pay ${numericAmount.toFixed(2)}
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          <div className="mt-3 text-center">
            <small className="text-muted">
              <FaCreditCard className="me-1" />
              Your payment information is secure and encrypted
            </small>
          </div>
        </Card.Body>
      </Card>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </motion.div>
  );
};

const StripePayment = ({ amount, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
};

export default StripePayment;
