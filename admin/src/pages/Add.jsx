import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Men');
    const [subCategory, setSubCategory] = useState('Topwear');
    const [bestseller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onsubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('subcategory', subCategory); // Ensure correct spelling
            formData.append('bestseller', bestseller);
            formData.append('sizes', JSON.stringify(sizes));

            if (image1) formData.append('image1', image1);
            if (image2) formData.append('image2', image2);
            if (image3) formData.append('image3', image3);
            if (image4) formData.append('image4', image4);

            

            const response = await axios.post(backendUrl +'/api/product/add', formData, { headers: { token }});

            console.log(response.data);
            if (response.data.success) {
                toast.success('Product added successfully!');
            } else {
                alert(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while adding the product.');
        }
    };

    return (
        <form onSubmit={onsubmitHandler} className="flex flex-col w-full items-start gap-3">
            {/* Upload Images Section */}
            <div className="w-full">
                <p className="mb-3 text-gray-600 font-medium">Upload Images</p>
                <div className="flex gap-3">
                    {[setImage1, setImage2, setImage3, setImage4].map((setImage, index) => (
                        <label
                            key={index}
                            htmlFor={`image${index + 1}`}
                            className="cursor-pointer border border-gray-300 rounded-md p-2 hover:border-blue-400 transition-all"
                        >
                            <img
                                className="w-16 h-16 object-cover"
                                src={
                                    ![image1, image2, image3, image4][index]
                                        ? assets.upload_area
                                        : URL.createObjectURL([image1, image2, image3, image4][index])
                                }
                                alt="Upload Placeholder"
                            />
                            <input
                                type="file"
                                id={`image${index + 1}`}
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Name */}
            <div className="w-1/2">
                <p className="mb-2 text-gray-600 font-medium">Product Name</p>
                <input
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Product Description */}
            <div className="w-1/2">
                <p className="mb-2 text-gray-600 font-medium">Product Description</p>
                <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Write product description here"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
            </div>

            {/* Product Category, Sub Category, and Price */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center sm:gap-6">
                {/* Product Category */}
                <div className="flex-1">
                    <p className="mb-2 text-gray-600 font-medium">Product Category</p>
                    <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                {/* Sub Category */}
                <div className="flex-1">
                    <p className="mb-2 text-gray-600 font-medium">Sub Category</p>
                    <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                {/* Product Price */}
                <div className="flex-1">
                    <p className="mb-2 text-gray-600 font-medium">Product Price</p>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Product Sizes */}
            <div>
                <p className="mb-2 text-gray-600 font-medium">Product Sizes</p>
                <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div
                            key={size}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(size)
                                        ? prev.filter((item) => item !== size)
                                        : [...prev, size]
                                )
                            }
                            className={`${
                                sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                            } px-3 py-1 cursor-pointer rounded-md`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add to Bestseller */}
            <div className="w-full">
                <input
                    type="checkbox"
                    id="bestseller"
                    checked={bestseller}
                    onChange={() => setBestSeller((prev) => !prev)}
                />
                <label htmlFor="bestseller" className="ml-2 text-gray-600">
                    Add to Bestseller
                </label>
            </div>

            {/* Submit Button */}
            <div className="w-1/2">
                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-all"
                >
                    Add Product
                </button>
            </div>
        </form>
    );
};

export default Add;
