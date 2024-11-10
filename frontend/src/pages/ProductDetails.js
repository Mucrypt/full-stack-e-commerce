import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import displayUSDCurrency from '../helpers/displayCurrency';
import CategoryWiseProduct from '../components/CategoryWiseProduct';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import { useTheme } from '../ThemeContext';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const { theme } = useTheme();
  const params = useParams();
  const navigate = useNavigate();
  const productImageListLoading = new Array(4).fill(null);

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productId: params?.id })
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data || {});
    setActiveImage(dataReponse?.data?.productImage[0] || "");
  }, [params]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">

        {/*** Product Image Section ***/}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-[var(--color-background)] relative p-2 shadow customShadow">
            <img
              src={activeImage}
              alt="Product"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-[var(--color-background)] p-1 -right-[510px] top-0 shadow customShadow">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                  }}
                />
              </div>
            )}
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((_, index) => (
                  <div className="h-20 w-20 bg-[var(--color-border)] rounded animate-pulse" key={index} />
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => (
                  <div className="h-20 w-20 bg-[var(--color-border)] rounded p-1" key={imgURL || index}>
                    <img
                      src={imgURL}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/*** Product Details ***/}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-[var(--color-border)] animate-pulse h-6 lg:h-8 w-full rounded-full inline-block" />
            <h2 className="text-2xl lg:text-4xl font-medium h-6 bg-[var(--color-border)] animate-pulse" />
            <p className="capitalize text-[var(--color-text)] bg-[var(--color-border)] min-w-[100px] animate-pulse h-6 lg:h-8 w-full" />

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="text-[var(--color-primary)] bg-[var(--color-border)] w-full" />
              <p className="text-[var(--color-text)] line-through bg-[var(--color-border)] w-full" />
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-[var(--color-border)] rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-[var(--color-border)] rounded animate-pulse w-full"></button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-[var(--color-primary)] text-[var(--color-background)] px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">{data?.productName || "Product Name"}</h2>
            <p className="capitalize text-[var(--color-text)]">{data?.category}</p>
            <div className="text-yellow-400 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-[var(--color-primary)]">{displayUSDCurrency(data.sellingPrice || 0)}</p>
              <p className="text-[var(--color-text)] line-through">{displayUSDCurrency(data.price || 0)}</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button
                 className="border-2 border-[var(--color-primary)] rounded px-3 py-1 min-w-[120px] font-medium text-[var(--color-background)] bg-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Buy
              </button>
              <button
                className="border-2 border-[var(--color-primary)] rounded px-3 py-1 min-w-[120px] font-medium text-[var(--color-background)] bg-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-[var(--color-text)] font-medium my-1">Description:</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data?.category && <CategoryWiseProduct category={data.category} heading="Recommended Product" />}
    </div>
  );
};

export default ProductDetails;
