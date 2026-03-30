import { Router } from 'express';
import { createOrder, deleteOrder } from '../controllers/order.controllers';

const router = Router();

router.post('/', createOrder);
router.delete('/:id', deleteOrder);

export default router;