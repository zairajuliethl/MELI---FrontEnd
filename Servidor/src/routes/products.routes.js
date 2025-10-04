import express from 'express';
import { 
  getProducts, 
  getProductById, 
} from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', getProducts);                    
router.get('/ml/:id', getProductById);          

export default router;
