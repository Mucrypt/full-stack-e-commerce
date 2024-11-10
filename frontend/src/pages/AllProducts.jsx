import React, { useEffect, useState } from 'react';
import UploadProduct from "../components/UploadProduct";
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
import { useTheme } from '../ThemeContext';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const { theme } = useTheme();

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
      <div className="py-2 px-4 flex justify-between items-center" style={{ backgroundColor: `var(--color-background)`, color: `var(--color-text)` }}>
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 rounded-full px-3 py-1"
          style={{
            backgroundColor: `var(--color-primary)`,
            color: `var(--color-background)`,
            borderColor: `var(--color-primary)`,
          }}
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/** All product list */}
      <div className="flex items-start flex-wrap gap-3 py-2 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allProduct"}
            fetchdata={fetchAllProduct}
          />
        ))}
      </div>

      {/** Upload product component */}
      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProducts;
