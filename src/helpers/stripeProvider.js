import { loadStripe } from "@stripe/stripe-js";

const stripeProvider = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default stripeProvider;