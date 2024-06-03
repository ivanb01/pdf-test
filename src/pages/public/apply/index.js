import { Header } from '@components/public/Header';
import ApplyContainer from 'containers/Applications/ApplyContainer';
// import stripeProvider from "@helpers/stripeProvider";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripeProvider = loadStripe(
  'pk_test_51OvfHZLS2j58kRASLOxehWmihaxh8AlLCbbSbSvZANr8GMhvvBhgSSqDxwDENkXciE6UBnq0YNnYJfAstMLikEqN00JkffozBi',
);

const index = () => {
  const options = {
    mode: 'payment',
    amount: 2500,
    currency: 'usd',
    appearance: {
      variables: {},
    },
  };
  return (
    <>
      <Elements stripe={stripeProvider} options={options}>
        <Header />
        <ApplyContainer />
      </Elements>
    </>
  );
};

export default index;
