import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/Home";
import  Login  from "../pages/Login";
import  Register  from "../pages/Register";
import  ForgotPassword  from "../pages/ForgotPassword";
import  AdminPanel  from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

//Here is for mysql pages 
import AllBooks from "../pages/AllBooks";
import SearchProduct from "../pages/SearchProduct";
import SuccessfulPayment from "../pages/SuccessfulPayment";
import CancelPayment from "../pages/CancelPayment";
import OrderPage from "../pages/OrderPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,  // Use 'element' instead of 'component'
        children: [
            {
                path: '/', 
                element: <Home />  // Use 'element' here as well
            },
            {
                path: "Login",
                element : <Login/>
            },
            {
                path: "Register",
                element : <Register/>
            },
            {
                path: "ForgotPassword",
                element : <ForgotPassword/>
            },

            {

                path: "product-category",
                element : <CategoryProduct/>,
            },

            {
                path: "product/:id",
                element: < ProductDetails/>
            },

            {
                path : 'cart',
                element : <Cart/>
            },

            {
                path: 'success',
                element : <SuccessfulPayment/>
            }, 

            {
                path: 'cancel',
                element : <CancelPayment/>
            },

            {
                path : 'order',
                element : <OrderPage/>
            },

            {
                path: 'search',
                element: <SearchProduct/>
            },


            {
                path: "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path: "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element : <AllProducts/>
                    },

                    {
                        path: "books",
                        element: <AllBooks/>
                    }


                ]
            }
           
        ]
    }
]);

export default router;
