export default async function handler(req, res) {
    const { newPlanId, customerEmail } = req.body;

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    try {
        // Find the customer by email
        const customers = await stripe.customers.list({ email: customerEmail });
        if (customers.data.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerId = customers.data[0].id;

        // Fetch the active subscription using the customer ID
        const subscriptions = await stripe.subscriptions.list({ customer: customerId, status: 'active' });
        if (subscriptions.data.length === 0) {
            return res.status(404).json({ error: 'No active subscriptions found' });
        }
        const subscriptionId = subscriptions.data[0].id;

        // Update the subscription with the new plan
        await stripe.subscriptions.update(subscriptionId, {
            items: [{ id: subscriptions.data[0].items.data[0].id, plan: newPlanId }],
        });

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}