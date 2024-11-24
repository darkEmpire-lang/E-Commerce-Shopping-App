import React, { useEffect, useContext } from 'react'; // Import useContext
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext'; // Ensure this context is correctly defined and exported
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams

const Verify = () => {
  const { navigate, token, setcartItems, backendUrl } = useContext(ShopContext); // Destructure ShopContext values
  const [searchParams] = useSearchParams(); // Extract search params

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setcartItems({});
        navigate('/orders');
      } else {
        navigate('/cart');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
      console.error('Error verifying payment:', error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div>Verifying your payment...</div>;
};

export default Verify;
