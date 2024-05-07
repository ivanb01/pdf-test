import { useStripe, Elements } from '@stripe/react-stripe-js';
import { Button } from '../Button';
import stripeProvider from '@helpers/stripeProvider';
import { isAuthValidRedirect, getCurrentUser } from '@helpers/auth';

const CheckoutButton = ({ priceId, children }) => {
  const stripe = useStripe();

  const handleClick = async () => {
    if (!(await isAuthValidRedirect())) return;

    const currentUser = await getCurrentUser();
    if (!currentUser) return;

    // Redirect to Stripe Checkout
    const customerEmail = currentUser.email || '';
    const tenantName = currentUser.tenant.name;
    const email = customerEmail || '';

    const stripeCheckout = {
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: window.location.origin,
      cancelUrl: window.location.origin,
    };

    if (email) stripeCheckout.customerEmail = email;

    const { error } = await stripe.redirectToCheckout(stripeCheckout);

    if (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Button type="primary" onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ({ priceId, children }) => (
  <Elements stripe={stripeProvider}>
    <CheckoutButton priceId={priceId} children={children} />
  </Elements>
);
