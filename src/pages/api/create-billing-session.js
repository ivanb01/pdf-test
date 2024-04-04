import Stripe from 'stripe';
import { getCurrentUser } from '@helpers/amplifySSR';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function getReturnDomain(req, includePath = false) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const path = includePath ? req.url : '';
  
  if (protocol && host) {
    return `${protocol}://${host}${path}`;
  }
  
  return "https://onelinecrm.com/settings/my-profile";
}

function getReturnPath(req) {
  const referer = req.headers['referer']; 
  if (referer) return referer;
  return null;
}

async function getCustomer(customerId, subscriptionId) {
  if (customerId) {
    try {
      return await stripe.customers.retrieve(customerId);
    } catch {
    }
  }
  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription && subscription.customer) {
      return await stripe.customers.retrieve(subscription.customer);
    }
  }
  throw new Error('Customer or subscription information is not valid.');
}

export default async function handler(req, res) {
  const { subscriptionId, customerId } = req.body;
  const userData = await getCurrentUser(req);

  if (userData.error || (!subscriptionId && !customerId)) {
    return res.status(404).json({ error: 'Customer or subscription required but not found.' });
  }

  const return_url = getReturnPath(req) || getReturnDomain(req);

  try {
    const customer = await getCustomer(customerId, subscriptionId);
    const billingSession = await stripe.billingPortal.sessions.create({
      return_url,
      customer: customer.id,
    });
    res.send({ sessionURL: billingSession.url });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
