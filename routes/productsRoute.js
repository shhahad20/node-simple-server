import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  rootFeedback,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// GET Routes
router.get("/", rootFeedback);
router.get("/products", getAllProducts);
router.get("/products/:id", getSingleProduct);
// DELETE Routes
router.delete("/products/:id", deleteProduct);
// POST Routes
router.post("/products", createProduct);
// UPDATE Routes
router.put("/products/:id", updateProduct);

export default router;
