import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const DOMAIN = 'https://subscriptions.onelinecrm.com';

import { getCurrentUser } from '@helpers/amplifySSR';

export default async function handler(req, res) {
  // TODO, add customerID back in
  // const { customerId } = req.body;
  const { subscriptionId } = req.body;

  const userData = await getCurrentUser(req);
  let user;

  if (userData.error || !subscriptionId) {
    return res.status(404).json({ status: 404, error: 'Customer not found' });
  }

  // TODO, add customerID back in
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const customer = await stripe.customers.retrieve(subscription.customer);

  if (!customer) res.status(500).json({ statusCode: 500, message: "Email not found." });

  const billingSession = await stripe.billingPortal.sessions.create({
    return_url: `${DOMAIN}/my-profile`,
    customer: customer.id
  });

  res.send({ sessionURL: billingSession.url });
};
