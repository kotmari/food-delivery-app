import { Router } from 'express'
import { getShopById, getShops, createShop } from '../controllers/shop.controller';

const router = Router()

router.get('/', getShops);
router.get('/:id', getShopById);
router.post('/create', createShop);

export default router;