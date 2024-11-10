const productOrderModel = require('../../model/productOrderModel');

const orderController = async (request, response) => {
    try {
        const currentUserId = request.userId;
        const orderList = await productOrderModel.find({ userId: currentUserId });

        response.json({
            data: orderList,
            message: 'Order List',
            success: true
        });
    } catch (error) {  // fixed typo here from `cerror` to `error`
        response.status(500).json({
            message: error.message || error,
            error: true
        });
    }
};

module.exports = orderController;
