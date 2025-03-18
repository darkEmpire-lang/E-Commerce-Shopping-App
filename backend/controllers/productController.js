import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    // Check and assign files from the request
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Filter out any undefined file entries
    const images = [image1, image2, image3, image4].filter(item => item !== undefined);

    // Upload each image to Cloudinary and get the secure URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url; // Return the secure URL of the uploaded image
      }) 
    );

    // Create a new product object
    const productData = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      bestseller: bestseller === 'true' ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,  // Array of image URLs
      date: Date.now(),  // Date of creation
    });

    console.log(productData);

    // Save the product data to the database
    await productData.save();  // Save the `productData` object

    // Respond with a success message
    res.json({ success: true, message: 'Product added successfully' });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error adding product', error: error.message });
  }
};

// Placeholder for other controller functions
const listProduct = async (req, res) => {

    try {

        const products=await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
        
    }


  
};

const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Prodcut Removed"})
        
    } catch {

        
        console.log(error)
        res.json({success:false,message:error.message})
        
        
    }
        
    
};

const singleProduct = async (req, res) => {
    

    try {
        
        const {productId}=req.body
        const product =await productModel.findById(productId)
        res.json({success:true,product})
        
    } catch (error) {

        
        console.log(error)
        res.json({success:false,message:error.message})
        
        
    }
  // Logic for retrieving a single product
};
const updateProduct = async (req, res) => {
  try {
    const { productId, name, description, price, category, subcategory, sizes, bestseller } = req.body;

    let updatedFields = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      bestseller: bestseller === 'true',
      sizes: JSON.parse(sizes),
      date: Date.now(), // Update timestamp
    };

    // Find product and update with new values (excluding images)
    const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedFields, { new: true });

    if (!updatedProduct) {
      return res.json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated successfully', product: updatedProduct });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error updating product', error: error.message });
  }
};


export { listProduct, addProduct, removeProduct, singleProduct,updateProduct };
