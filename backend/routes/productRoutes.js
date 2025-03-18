import express from 'express';
import { listProduct, addProduct, singleProduct, removeProduct,updateProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add product with image uploads (POST method)
productRouter.post('/add',adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);


productRouter.post('/remove', removeProduct);


productRouter.get('/single', singleProduct);


productRouter.get('/list', listProduct);


productRouter.put('/update/:id', updateProduct);





export default productRouter;
