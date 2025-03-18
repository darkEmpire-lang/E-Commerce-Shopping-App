import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Living Room");
  const [subCategory, setSubCategory] = useState("Beds & Bed Frames");
  const [bestseller, setBestSeller] = useState(false);
 const [sizes, setSizes] = useState([]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subCategory); // Ensure correct spelling
      formData.append("bestseller", bestseller);
     formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success("Furniture added successfully!");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Upload Images Section */}
      <div className="w-full">
        <p className="mb-3 text-gray-600 font-medium">Upload Images</p>
        <div className="flex gap-3">
          {[setImage1, setImage2, setImage3, setImage4].map(
            (setImage, index) => (
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
                      : URL.createObjectURL(
                          [image1, image2, image3, image4][index]
                        )
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
            )
          )}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-1/2">
        <p className="mb-2 text-gray-600 font-medium">Furniture Name</p>
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
        <p className="mb-2 text-gray-600 font-medium">Furniture Description</p>
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
          <p className="mb-2 text-gray-600 font-medium">Furniture Category</p>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Office Furniture">Office Furniture</option>
            <option value="Outdoor & Patio">Outdoor & Patio</option>
            <option value="Storage & Organization">
              Storage & Organization
            </option>
            <option value="Kids' Furniture">Kids' Furniture</option>
            <option value="Bathroom Furniture">Bathroom Furniture</option>
            <option value="Kitchen Furniture">Kitchen Furniture</option>
            <option value="Gaming & Entertainment">
              Gaming & Entertainment
            </option>
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
            <option value="Sofas & Couches">Sofas & Couches</option>
            <option value="Coffee Tables">Coffee Tables</option>
            <option value="TV Stands & Media Consoles">
              TV Stands & Media Consoles
            </option>
            <option value="Beds & Bed Frames">Beds & Bed Frames</option>
            <option value="Nightstands">Nightstands</option>
            <option value="Dining Tables">Dining Tables</option>
            <option value="Dining Chairs">Dining Chairs</option>
            <option value="Office Desks">Office Desks</option>
            <option value="Office Chairs">Office Chairs</option>
            <option value="Patio Sets">Patio Sets</option>
            <option value="Outdoor Sofas">Outdoor Sofas</option>
            <option value="Gaming Chairs">Gaming Chairs</option>
            <option value="Gaming Desks">Gaming Desks</option>
            <option value="Bathroom Vanities">Bathroom Vanities</option>
            <option value="Storage Cabinets">Storage Cabinets</option>
          </select>
        </div>

        {/* Product Price */}
        <div className="flex-1">
          <p className="mb-2 text-gray-600 font-medium">Furniture Price</p>
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

      {/*Product Sizes */}
            <div>
                <p className="mb-2 text-gray-600 font-medium">Select Dimension</p>
                <div className="flex gap-3">
                    {['Small (3ft x 2ft)', 'Medium (5ft x 3ft)', 'Large (7ft x 4ft)', 'Custom'].map((size) => (
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
          Add to New Collection
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
