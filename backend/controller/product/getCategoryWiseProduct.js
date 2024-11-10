const productModel = require("../../model/productModel")

const getCategoryWiseProduct = async (req, res) => {
    try {
        const {category} = req?.body || req?.query
        const product = await productModel.find({category})

        res.json({
            message : "Category Wise Product",
            success : true,
            error : false,
            data : product
        })

    } catch (error) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = getCategoryWiseProduct