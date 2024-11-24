import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    // Check if token is missing
    if (!token) {
      console.log('Token is missing.');
      return;
    }

    try {
      // Fetch orders from the backend
      const response = await axios.get(backendUrl +'/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        // Set orders in the state and display the new ones at the top
        setOrders(response.data.orders.reverse()); // Reverse to show new orders on top
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      toast.error('Failed to fetch orders.');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders(); // Re-fetch orders to update status
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update order status.');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Orders</h3>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id} // Use the order's _id for unique keys
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-300 rounded-lg bg-white shadow-md p-5 hover:shadow-lg transition-shadow"
            >
              <img className="w-16 h-16 object-cover mx-auto sm:mx-0" src={assets.parcel_icon} alt="Parcel Icon" />

              <div>
                <div>
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-gray-700">
                      {item.name} x {item.quantity} <span>({item.size})</span>
                      {idx !== order.items.length - 1 && <span>,</span>}
                    </p>
                  ))}
                </div>
                <p className="mt-4 font-medium text-gray-800">
                  {`${order.address.firstName} ${order.address.lastName}`}
                </p>
                <p>{`${order.address.street}, ${order.address.city}`}</p>
                <p>{`${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                <p>{`Phone: ${order.address.phone}`}</p>
              </div>

              <div className="flex flex-col text-gray-700">
                <p className="font-semibold">Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>
                  Payment:{" "}
                  <span className={order.payment ? "text-green-600" : "text-red-600"}>
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p className="font-semibold text-lg text-gray-800 text-center lg:text-right">
                {currency}
                {order.amount.toFixed(2)}
              </p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 rounded-md border border-gray-300 font-semibold text-gray-600"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
