import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe with publishable key from environment variables
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_your_stripe_publishable_key_here";

// Add validation to prevent undefined key
if (!stripePublishableKey || stripePublishableKey === "pk_test_your_stripe_publishable_key_here") {
  console.warn("Stripe publishable key not found. Please set REACT_APP_STRIPE_PUBLISHABLE_KEY in your .env file");
}

const stripePromise = loadStripe(stripePublishableKey);

const StripeElements = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeElements;
