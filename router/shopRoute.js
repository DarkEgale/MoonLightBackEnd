import express from 'express';
import { createProductController, updateProductController, deleteProductController, getAllProductsController, getSingleProductController } from '../controllers/productsController.js';
import { createSaleController, updateSaleController, deleteSaleController, getAllSalesController, getSingleSaleController, getDueSalesController, updateDueSaleController } from '../controllers/saleController.js';
import { getAllEmployeController } from '../controllers/employeController.js';
import { protect } from '../middleware/tokencheck.js';
import { shopAccess } from '../middleware/shopAccess.js';
const router = express.Router();

// All shop routes require authentication and shop access
router.use(protect, shopAccess);

// Product management (shop-specific)
router.post("/create-product", createProductController);
router.patch("/update-product/:id", updateProductController);
router.delete("/delete-product/:id", deleteProductController);
router.get("/get-products", getAllProductsController);
router.get("/get-product/:id", getSingleProductController);

// Sale management (shop-specific)
router.post("/create-sale", createSaleController);
router.patch("/update-sale/:id", updateSaleController);
router.delete("/delete-sale/:id", deleteSaleController);
router.get("/get-sales", getAllSalesController);
router.get("/get-sale/:id", getSingleSaleController);
router.get("/get-due-sales", getDueSalesController);
router.patch("/update-due-sale/:id", updateDueSaleController);

// Employee management (shop-specific)
router.get("/get-employees", getAllEmployeController);

export default router;