import express from 'express'
import { 
    addOrderItems,
    getOrderById,
    updateOrderToPaid
} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(protect, addOrderItems)
//make sure this route is that the bottom, otherwise if you have /sth else, it will look at it as an id
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router;