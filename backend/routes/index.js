const express = require('express');
const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const userLogoutController = require('../controller/user/userLogout');
const authToken = require('../middleware/authToken');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const updateProductController = require('../controller/product/updateProduct')

const  UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require("../controller/product/getProduct");
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require ('../controller/product/getProductDetails')


const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')


const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhooks');
const orderController = require('../controller/order/orderController');


//const webhooks = require('../controller/order/webhooks')




//User Routes
router.post('/Register', userSignUpController);
router.post('/Login', userSignInController);
router.get('/userDetails', authToken, userDetailsController);
router.get('/userLogout',  userLogoutController);
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);


//Product Routes
router.post('/upload-product', authToken,  UploadProductController);
router.get("/get-product", getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/get-categoryWiseProduct", getCategoryWiseProduct)
router.post('/product-details', getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.post("/category-product",getCategoryWiseProduct)



//User Add To Cart
router.post("/addtocart",authToken, addToCartController)
router.get('/countAddToCartProduct',authToken,countAddToCartProduct)
router.get('/view-card-product', authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//Payment and order
router.post('/checkout',authToken,paymentController)
router.post('/webhook', webhooks)
router.get('/order-list',authToken,orderController);

module.exports = router;