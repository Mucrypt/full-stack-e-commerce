import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartViewProduct.url, {
            method: SummaryApi.addToCartViewProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });
        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id, quantity: qty + 1 })
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({ _id: id, quantity: qty - 1 })
            });
            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id })
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

    const handlePayment = async () => {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ cartItems: data })
        });
        const responseData = await response.json();
        if (responseData?.id) {
            stripePromise.redirectToCheckout({ sessionId: responseData.id });
        }
    };

    return (
        <div className="container mx-auto">
            <div className="text-center text-lg my-4">
                {data.length === 0 && !loading && (
                    <div className="flex flex-col items-center">
                        <FaShoppingCart size={50} className="text-gray-400 mb-4" />
                        <p style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
                            Your cart is empty. Start adding some products!
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
                {/*** View Product ***/}
                <div className="w-full max-w-3xl">
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={`AddToCartLoading${index}`} className="w-full h-32 my-2 border animate-pulse rounded" style={{ backgroundColor: 'var(--color-shadow)', borderColor: 'var(--color-border)' }}></div>
                        ))
                    ) : (
                        data.map(product => (
                            <div key={product?._id} className="w-full h-32 my-2 border rounded grid grid-cols-[128px,1fr]" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                                <div className="w-32 h-32" style={{ backgroundColor: 'var(--color-shadow)' }}>
                                    <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className="w-full h-full object-scale-down mix-blend-multiply" />
                                </div>
                                <div className="px-4 py-2 relative">
                                    {/** Delete Product */}
                                    <div className="absolute right-0 text-red-600 p-2 cursor-pointer hover:bg-red-600 hover:text-white rounded-full" onClick={() => deleteCartProduct(product?._id)} style={{ color: 'var(--color-primary)' }}>
                                        <MdDelete />
                                    </div>
                                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1" style={{ color: 'var(--color-text)' }}>{product?.productId?.productName}</h2>
                                    <p className="capitalize" style={{ color: 'var(--color-text-secondary)' }}>{product?.productId.category}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-medium" style={{ color: 'var(--color-primary)' }}>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <button className="border w-6 h-6 flex justify-center items-center rounded" onClick={() => decreaseQty(product?._id, product?.quantity)} style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-background)' }}>-</button>
                                        <span style={{ color: 'var(--color-text)' }}>{product?.quantity}</span>
                                        <button className="border w-6 h-6 flex justify-center items-center rounded" onClick={() => increaseQty(product?._id, product?.quantity)} style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'var(--color-background)' }}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/*** Summary ***/}
                {data[0] && (
                    <div className="mt-5 lg:mt-0 w-full max-w-sm">
                        {loading ? (
                            <div className="h-36 animate-pulse border rounded" style={{ backgroundColor: 'var(--color-shadow)', borderColor: 'var(--color-border)' }}></div>
                        ) : (
                            <div className="h-36 rounded" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
                                <h2 className="px-4 py-1" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}>Summary</h2>
                                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg">
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg">
                                    <p>Total Price</p>
                                    <p>{displayINRCurrency(totalPrice)}</p>
                                </div>
                                <button onClick={handlePayment} className="w-full py-2 rounded-full font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}>
                                    Proceed to Payment
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
