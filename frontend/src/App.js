// Ensure to import the useTheme hook
import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import Context from './context';
import './App.css';
import SummaryApi from './common';
import { useTheme } from './ThemeContext';

function App() {
  const dispatch = useDispatch();
  const { theme } = useTheme(); // Access theme from context
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });
      const responseData = await dataResponse.json();
      if (responseData.success) {
        dispatch(setUserDetails(responseData.data)); // Update the Redux store
      }
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  }, [dispatch]);

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails]);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
      }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={theme} // Sync Toast theme with app theme
        transition={Slide}
        toastClassName="modern-toast"
        bodyClassName="toast-body"
        progressClassName="toast-progress"
      />

      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
