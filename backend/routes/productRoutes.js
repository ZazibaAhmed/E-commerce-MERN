import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
// OR ALTERNATE WAY
// router.get('/', getProducts)

router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);
// OR ALTERNATE WAY
// router.get('/:id', getProductById)

export default router;
