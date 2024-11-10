const userModel = require("../../model/userModel");
const stripe = require("../../config/stripe");

/**
 * Payment Controller
 * Creates a Stripe checkout session based on cart items and user information.
 * @param {Object} request - Express request object containing user ID and cart items
 * @param {Object} response - Express response object for sending back session or error
 */
const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;

        // Retrieve user details from the database
        const user = await userModel.findOne({ _id: request.userId });
        if (!user) {
            return response.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Define parameters for Stripe checkout session
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1QIcmnKQ56fnaANWEz1aqwew' // Replace with your own shipping rate ID
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: request.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'EUR',
                        product_data: {
                            name: item.productId.productName,
                            images: Array.isArray(item.productId.productImage) ? item.productId.productImage : [item.productId.productImage], // Ensure images is an array
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: Math.round(item.productId.sellingPrice * 100) // Convert price to cents
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create(params);

        // Send the session data in the response
        response.status(303).json(session);
    } catch (error) {
        console.error('Payment creation failed:', error.message);
        response.status(500).json({
            message: error.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
