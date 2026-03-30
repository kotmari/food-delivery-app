import { Router } from 'express'
import { getProductById, getProductsByShop } from '../controllers/products.controllers';

const router = Router()

router.get('/shop/:shopId', getProductsByShop);
router.get('/:id', getProductById);


export default router;