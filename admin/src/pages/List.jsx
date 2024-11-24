import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch Product List
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching product list.');
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl +'/api/product/remove', { id }, { headers: { token } } );

      if (response.data.success) {
        toast.success('Product removed successfully!');
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error removing product.');
    }
  };

  // Fetch List on Component Mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <p className="mb-4 text-lg font-bold">All Products List</p>

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        <div className="flex flex-col gap-4">
          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border rounded-md"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <p className="font-medium">{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currency}
                {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-black-500 cursor-pointer hover:underline text-center"
              >
                X
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default List;
