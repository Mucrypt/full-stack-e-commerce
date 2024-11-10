import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include',
      });
      const responseData = await response.json();
      if (responseData.success) {
        setOrders(responseData.data);
      } else {
        console.error('Failed to fetch orders:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>Order History</h1>
      <div className="space-y-6 max-h-[75vh] overflow-y-auto p-4 border rounded " 
           style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
        {orders.map((order, index) => (
          <div key={order._id} className="border rounded-lg p-6 shadow-lg" 
               style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--color-primary)' }}>Order #{index + 1}</h2>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500" style={{ color: 'var(--color-text-secondary)' }}>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <button
                  className="px-4 py-1 rounded text-white font-semibold transition-all"
                  onClick={() => toggleOrderDetails(order._id)}
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {expandedOrders[order._id] ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </div>

            <div className={`transition-all ${expandedOrders[order._id] ? 'block' : 'hidden'}`}>
              <div className="flex justify-between mb-4">
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-md ${
                      order.orderStatus === "completed" ? "bg-green-100 text-green-800" :
                      order.orderStatus === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}
                    style={{
                      backgroundColor:
                        order.orderStatus === "completed" ? "rgba(144, 238, 144, 0.2)" :
                        order.orderStatus === "pending" ? "rgba(255, 215, 0, 0.2)" : 
                        "rgba(255, 99, 71, 0.2)",
                      color: order.orderStatus === "completed" ? "green" : 
                             order.orderStatus === "pending" ? "goldenrod" : "tomato",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </p>
                <p className="text-sm">Payment Status: <span className="font-semibold">{order.paymentDetails.paymentStatus}</span></p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-primary)' }}>Products</h3>
                {order.productDetails.map((product, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md mr-4 object-cover" />
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{product.name}</p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Price: €{product.price.toFixed(2)}</p>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-primary)' }}>Payment Details</h3>
                <p className="text-sm">Total Amount: <span className="font-semibold">€{order.paymentDetails.amountTotal.toFixed(2)}</span></p>
                <p className="text-sm">Currency: <span className="font-semibold">{order.paymentDetails.currency.toUpperCase()}</span></p>
                <p className="text-sm">Payment Method: <span className="font-semibold">{order.paymentDetails.paymentMethod.type || 'N/A'}</span></p>
                <p className="text-sm">Card Last 4: <span className="font-semibold">{order.paymentDetails.paymentMethod.cardLast4 || 'N/A'}</span></p>
              </div>

              {order.shippingOption && (
                <div>
                  <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--color-primary)' }}>Shipping Details</h3>
                  <p className="text-sm">Shipping Method: <span className="font-semibold">{order.shippingOption.displayName}</span></p>
                  <p className="text-sm">Shipping Amount: <span className="font-semibold">€{order.shippingOption.amount.toFixed(2)}</span></p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
