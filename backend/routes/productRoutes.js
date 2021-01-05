import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts)
// OR ALTERNATE WAY
// router.get('/', getProducts)

router.route('/:id').get(getProductById)
// OR ALTERNATE WAY
// router.get('/:id', getProductById)


export default router;