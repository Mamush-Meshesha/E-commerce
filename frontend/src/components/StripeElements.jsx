import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Load Stripe with publishable key from environment variables
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_your_stripe_publishable_key_here"
);

const StripeElements = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeElements;
