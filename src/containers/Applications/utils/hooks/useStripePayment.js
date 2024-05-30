import { useState, useEffect } from 'react';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import usePaymentStatusMessage from './usePaymentStatusMessage';

const useStripePayment = ({ onError = () => {} }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorOnPayment, setIsErrorOnPayment] = useState(null);
  const [loading, setLoading] = useState(false);

  const { message, paymentStatus } = usePaymentStatusMessage();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
    setIsErrorOnPayment(true);
    onError(error);
  };

  const handleSubmitPayment = async (data) => {
    if (!stripe || !data) {
      return;
    }

    setLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const { client_secret: clientSecret } = data.payment_intent;
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url:
          `${window.location.origin}/public/apply/apply-payment-status?` +
          encodeURIComponent(`${`client_email=${data.client_email}&client_name=${data.client_first_name}`}`),
      },
    });

    if (error) {
      handleError(error);
    } else {
    }
  };

  return {
    elements,
    errorMessage,
    loading,
    statusMessage: message,
    handleSubmitPayment,
    paymentStatus,
    isErrorOnPayment,
  };
};

export default useStripePayment;
