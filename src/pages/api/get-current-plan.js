import { getCurrentUser } from '@helpers/amplifySSR';

export default async function handler(req, res) {
    const userData = await getCurrentUser(req);
    let user;

    if (userData.error) {
        return res.status(404).json({ status: 404, error: 'Customer not found' });
    }

    user = userData.user;
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    try {
        // Find the customer by email
        const customers = await stripe.customers.list({ email: user.username });
        if (customers.data.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerId = customers.data[0].id;

        // Fetch the current plan from Stripe using the customer ID
        const subscriptions = await stripe.subscriptions.list({ customer: customerId, status: 'active' });

        if (subscriptions.data.length > 0) {
            const currentPlan = subscriptions.data[0].items.data[0].plan;
            const product = await stripe.products.retrieve(currentPlan.product);
            const description = `${product.name}, $${currentPlan.amount/100} / ${currentPlan.interval}`;

            res.status(200).json({ description, productName: product.name, planId: currentPlan.id, interval: currentPlan.interval });
        } else {
            res.status(404).json({ error: 'No active subscriptions found' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}