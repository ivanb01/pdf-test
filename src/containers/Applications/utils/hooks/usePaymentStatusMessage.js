import { useState, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";

const usePaymentStatusMessage = () => {
  const stripe = useStripe();
  const [message, setMessage] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    const clientEmail = new URLSearchParams(window.location.search).get("client_email");
    const clientName = new URLSearchParams(window.location.search).get("client_first_name");
    setClientData({
      clientEmail,
      clientName,
    });
    if (clientSecret)
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        setPaymentStatus(paymentIntent.status);
        console.log("paymentIntent.status", paymentIntent.status);
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Success! Payment received.");
            break;

          case "processing":
            setMessage("Payment processing. We'll update you when payment is received.");
            break;

          case "requires_payment_method":
            setMessage("Payment failed. Please try another payment method.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  return { message, paymentStatus, clientData };
};

export default usePaymentStatusMessage;
