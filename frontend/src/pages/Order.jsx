import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrderItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['orderId'] = order._id; // Add orderId to track orders
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error.message);
    }
  };

  const trackOrder = (orderId) => {
    // Logic to track order. For example, showing a modal or redirecting to a tracking page
    console.log(`Tracking order ${orderId}`);
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="My " text2=" ORDERS " />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image ? item.image[0] : ''}
                alt={item.name}
              />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date:{' '}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment:{' '}
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${
                    item.status === 'Shipped' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                ></p>
                <p className="text-sm md:text-base">{item.status || 'Processing'}</p>
              </div>
              <button
                onClick={() => trackOrder(item.orderId)}  // Call trackOrder function
                className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Orders;
