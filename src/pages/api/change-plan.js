export default async function handler(req, res) {
  const { newPlanId, userInfo } = req.body;
  const subscriptionId = userInfo?.subscriptionId;

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  if (!subscriptionId) return res.status(404).json({ error: 'No active subscriptions found' });

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ error: 'No active subscriptions found' });
    }

    // Update the subscription with the new plan
    await stripe.subscriptions.update(subscriptionId, {
      items: [{ id: subscription.items.data[0].id, plan: newPlanId }],
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
