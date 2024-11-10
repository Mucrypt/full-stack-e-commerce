// backend/routes/webhooks.js

const addToCartModel = require("../../model/cartProduct");
const productOrderModel = require('../../model/productOrderModel');
const stripe = require('../../config/stripe');
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
    let productItems = [];

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount / 100,
                quantity: item.quantity,
                image: product.images ? product.images[0] : null,
            };

            productItems.push(productData);
        }
    }

    return productItems;
}

const webhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    const payloadString = JSON.stringify(request.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;

            try {
                // Retrieve line items for the session
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
                const productDetails = await getLineItems(lineItems);

                // Retrieve the payment intent to get the payment method details
                const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
                const paymentMethod = paymentIntent.payment_method_details || {};

                // Prepare payment method details for storage
                const paymentMethodDetails = {
                    type: paymentMethod.type || 'unknown',
                    cardLast4: paymentMethod.card?.last4 || null,
                    cardBrand: paymentMethod.card?.brand || null,
                };

                // Prepare shipping details if available
                const shippingDetails = session.shipping || {
                    address: session.billing_details?.address || {},
                    name: session.billing_details?.name || null,
                    phone: session.billing_details?.phone || null,
                };

                // Get shipping cost and shipping rate
                const shippingCost = session.shipping_cost?.amount_total ? session.shipping_cost.amount_total / 100 : 0;
                const shippingRateId = session.shipping_cost?.shipping_rate;

                let shippingOption = null;
                if (shippingRateId) {
                    // Retrieve shipping rate details
                    const shippingRate = await stripe.shippingRates.retrieve(shippingRateId);
                    shippingOption = {
                        id: shippingRate.id,
                        displayName: shippingRate.display_name,
                        amount: shippingRate.fixed_amount?.amount ? shippingRate.fixed_amount.amount / 100 : null,
                        currency: shippingRate.fixed_amount?.currency || null,
                        deliveryEstimate: shippingRate.delivery_estimate || null,
                        description: shippingRate.metadata?.description || null,
                    };
                }

                // Create an order document with product, payment, and shipping details
                const order = new productOrderModel({
                    productDetails: productDetails,
                    email: session.customer_email,
                    userId: session.metadata.userId,
                    paymentDetails: {
                        paymentStatus: session.payment_status,
                        paymentIntentId: session.payment_intent,
                        amountSubtotal: session.amount_subtotal / 100,
                        shippingAmount: shippingCost,
                        amountTotal: session.amount_total / 100,
                        currency: session.currency,
                        paymentMethod: paymentMethodDetails,
                    },
                    shippingDetails: shippingDetails,
                    shippingOption: shippingOption,
                    orderStatus: 'completed',
                });

                const saveOrder = await order.save();

                if (saveOrder?._id) {
                    // Delete all cart items for the user
                    const deleteCartItems = await addToCartModel.deleteMany({ userId: session.metadata.userId });
                    if (deleteCartItems.deletedCount > 0) {
                        console.log(`Successfully deleted ${deleteCartItems.deletedCount} items from cart for user ${session.metadata.userId}.`);
                    } else {
                        console.log(`No items found in cart for user ${session.metadata.userId}.`);
                    }
                }

                console.log('Order saved with payment and shipping details:', order);
            } catch (err) {
                console.error(`Failed to retrieve or save line items: ${err.message}`);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    console.log(`Received event: ${event.type}`);
    response.status(200).send();
};

module.exports = webhooks;
