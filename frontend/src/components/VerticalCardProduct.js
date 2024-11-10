import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);
    const scrollElement = useRef();
    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-semibold py-4" style={{ color: 'var(--color-text)' }}>{heading}</h2>

            <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all" ref={scrollElement}>
                <button
                    className="shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
                    onClick={scrollLeft}
                    style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
                    onClick={scrollRight}
                    style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
                >
                    <FaAngleRight />
                </button>

                {loading ? (
                    loadingList.map((_, index) => (
                        <div
                            key={`LoadingProduct${index}`}
                            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow"
                            style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
                        >
                            <div className="h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse" style={{ backgroundColor: 'var(--color-shadow)' }}></div>
                            <div className="p-4 grid gap-3">
                                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 py-2 animate-pulse rounded-full" style={{ backgroundColor: 'var(--color-shadow)' }}></h2>
                                <p className="capitalize p-1 animate-pulse rounded-full py-2" style={{ backgroundColor: 'var(--color-shadow)' }}></p>
                                <div className="flex gap-3">
                                    <p className="font-medium p-1 animate-pulse rounded-full w-full py-2" style={{ backgroundColor: 'var(--color-shadow)' }}></p>
                                    <p className="line-through p-1 animate-pulse rounded-full w-full py-2" style={{ backgroundColor: 'var(--color-shadow)' }}></p>
                                </div>
                                <button className="text-sm px-3 rounded-full py-2 animate-pulse" style={{ backgroundColor: 'var(--color-shadow)' }}></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.map((product) => (
                        <Link
                            to={`product/${product?._id}`}
                            key={product?._id}
                            className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow"
                            style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}
                        >
                            <div className="h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center" style={{ backgroundColor: 'var(--color-shadow)' }}>
                                <img
                                    src={product.productImage[0]}
                                    alt={product?.productName}
                                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                                />
                            </div>
                            <div className="p-4 grid gap-3">
                                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1" style={{ color: 'var(--color-text)' }}>{product?.productName}</h2>
                                <p className="capitalize" style={{ color: 'var(--color-text-secondary)' }}>{product?.category}</p>
                                <div className="flex gap-3">
                                    <p className="font-medium" style={{ color: 'var(--color-primary)' }}>{displayINRCurrency(product?.sellingPrice)}</p>
                                    <p className="line-through" style={{ color: 'var(--color-text-secondary)' }}>{displayINRCurrency(product?.price)}</p>
                                </div>
                                <button
                                    className="text-sm px-3 py-0.5 rounded-full"
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default VerticalCardProduct;
