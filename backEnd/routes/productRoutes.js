import express from 'express';
const router = express.Router();
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
    getLatestProducts
} from '../controllers/productController.js';  
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopProducts);
router.get('/latest', getLatestProducts);
router
    .route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);
export default router;