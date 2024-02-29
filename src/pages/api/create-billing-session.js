import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const DOMAIN = 'https://subscriptions.onelinecrm.com';

import { getCurrentUser } from '@helpers/amplifySSR';

export default async function handler(req, res) {
  const { priceId } = req.body;

  const userData = await getCurrentUser(req);
  let user;

  if (userData.error) {
    return res.status(404).json({ status: 404, error: 'Customer not found' });
  }

  user = userData.user;

  // This should be done by retrieving customer id instead fetched from the backend, to support multisubs
  // Also good to add tenantId/tenantName
  const customers = await stripe.customers.search({
    query: `email: "${user.username}"`,
  });

  const customer = customers?.data[0];

  if (!customer) res.status(500).json({ statusCode: 500, message: "Email not found." });

  const billingSession = await stripe.billingPortal.sessions.create({
    return_url: `${DOMAIN}/my-profile`,
    customer: customer.id
  });

  res.send({ sessionURL: billingSession.url });
};
