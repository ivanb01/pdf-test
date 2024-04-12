import React, { useState, useEffect } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import Modal from "./Modal";
import { Button } from '../Button';
import { isAuthValidRedirect, getCurrentUser } from '@helpers/auth';

import stripeProvider from '@helpers/stripeProvider';

const CheckoutForm = ({ priceId, children }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const startEmbeddedCheckout = async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) return;

      const customerEmail = currentUser.email || '';
      const tenantId = currentUser.tenant.id;
      const tenantName = currentUser.tenant.name;
      const email = customerEmail || '';

      fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, email, tenantName, tenantId })
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    };

    startEmbeddedCheckout();
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripeProvider}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button type="primary" onClick={async () => {
        if (!(await isAuthValidRedirect(props.priceId))) return;
        setShowModal(true)
      }}>
        { props.children }
      </Button>
      { showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CheckoutForm {...props} />
        </Modal>
      )}
      <div id="modal-root"></div>
    </>
  )
};