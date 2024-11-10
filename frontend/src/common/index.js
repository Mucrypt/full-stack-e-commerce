//frontend/src/common/index.js
const backendDomain =process.env.REACT_APP_BACKEND_URL // 'http://localhost:8080';

const SummaryApi = {
    Register : {
        url: `${backendDomain}/api/Register`,
        method: 'POST'

    },
    Login : {
        url: `${backendDomain}/api/login`,
        method: 'POST'
    },
    current_user : {
        url: `${backendDomain}/api/userDetails`,
        method: 'GET'
    },
    logout_user : {
        url: `${backendDomain}/api/userLogout`,
        method: 'GET'
    },

    allUsers: {
        url: `${backendDomain}/api/all-users`,
        method: 'GET'
    },

    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'POST'
    },

    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'POST'
    },

    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },

    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "POST"
    },
    categoryProduct : {
        url : `${backendDomain}/api/get-categoryProduct`,
        method : 'get'
    },

    categoryWiseProduct : {
        url : `${backendDomain}/api/category-product`,
        method : 'post'
    },

    productDetails : {
        url :  `${backendDomain}/api/product-details`,
        method: 'post'

    },

    addToCartProduct : {
        url : `${backendDomain}/api/addtoCart`,
        method: 'post'
    },

    countAddToCartProduct : {
        url : `${backendDomain}/api/countAddToCartProduct`,
        method: 'get'
    },

    addToCartViewProduct : {
        url : `${backendDomain}/api/view-card-product`,
        method: 'get'

    },

    updateCartProduct : {
        url : `${backendDomain}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cart-product`,
        method : 'post'
    },

        searchProduct: {
            url : ` ${backendDomain}/api/search`,
            method : 'get'
        },

        filterProduct : {
            url : `${backendDomain}/api/filter-product`,
            method : 'post'
        },
       
        payment : {
            url : `${backendDomain}/api/checkout`,
            method : 'post'
        },

        getOrder: {
            url: `${backendDomain}/api/order-list`,
            method: 'get'
        },
        

      

    //This Section is for the mysql database
    getAllBooks : {
        url: `${backendDomain}/api/books`,
        method: "get"
    },

    uploadBook: {
        url: `${backendDomain}/api/upload-book`,
        method: 'POST'
      },

   
}

export default SummaryApi;