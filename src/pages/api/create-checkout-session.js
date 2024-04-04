import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function getReturnDomain(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  if (protocol && host) return `${protocol}://${host}`;
  return "https://onelinecrm.com";
}

export default async function handler(req, res) {
  const { priceId, email, tenantName, tenantId } = req.body;

  const DOMAIN = getReturnDomain(req);

  const stripeCheckout = {
    ui_mode: 'embedded',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    return_url: `${DOMAIN}/public/session-return?session_id={CHECKOUT_SESSION_ID}`,
    subscription_data: {
      metadata: {
        email: email,
        tenantName: tenantName,
        tenantId: tenantId,
        priceId: priceId,
      },
    },
    // custom_fields: [{
    //   key: 'tenantName',
    //   label: {
    //     type: 'custom',
    //     custom: 'Tenant',
    //   },
    //   optional: false,
    //   type: 'dropdown',
    //   dropdown: {
    //     options: [
    //       {
    //         label: 'Oxford Property Group',
    //         value: 'OxfordPropertyGroup',
    //       },
    //       {
    //         label: 'Level Group',
    //         value: 'LevelGroup',
    //       },
    //       {
    //         label: 'Spire Group',
    //         value: 'SpireGroup',
    //       },
    //     ],
    //   },
    // }],
  };

  if (req?.body?.email) stripeCheckout.customer_email = req.body.email;

  const session = await stripe.checkout.sessions.create(stripeCheckout);

  res.send({clientSecret: session.client_secret});
};

// The session id is used in client-side as follows
// Stripe.redirectToCheckout({ sessionId });