import express from 'express';
import { getShopsController, createShopController, updateShopController, deleteShopController } from '../controllers/shopController.js';
import { createEmployeController, updateEmployeController, deleteEmployeController, getAllEmployeController } from '../controllers/employeController.js';
import { createProductController, updateProductController, deleteProductController, getAllProductsController, getSingleProductController } from '../controllers/productsController.js';
import { createSaleController, updateSaleController, deleteSaleController, getAllSalesController, getSingleSaleController, getDueSalesController, updateDueSaleController } from '../controllers/saleController.js';
import { getAllUsersController } from '../controllers/authController.js';
import { protect } from '../middleware/tokencheck.js';
import { adminVerify } from '../middleware/admincheck.js';
import { shopAccess } from '../middleware/shopAccess.js';
const router = express.Router();
// Shop management
router.post("/create-shop", protect, adminVerify, createShopController);
router.patch("/update-shop/:id", protect, adminVerify, updateShopController);
router.delete("/delete-shop/:id", protect, adminVerify, deleteShopController);
router.get("/get-shops/:id", protect, adminVerify, getShopsController);

// Employee management
router.post("/register-employe", protect, adminVerify, createEmployeController);
router.patch("/update-employe/:id", protect, adminVerify, updateEmployeController);
router.delete("/delete-employe/:id", protect, adminVerify, deleteEmployeController);
router.get("/get-employees/:shopId", protect, adminVerify, getAllEmployeController);

// Product management
router.post("/create-product", protect, adminVerify, createProductController);
router.patch("/update-product/:id", protect, adminVerify, updateProductController);
router.delete("/delete-product/:id", protect, adminVerify, deleteProductController);
router.get("/get-products/:shopId", protect, adminVerify, shopAccess, getAllProductsController);
router.get("/get-product/:id", protect, adminVerify, getSingleProductController);

// All users (admin only)
router.get("/get-all-users", protect, adminVerify, getAllUsersController);

// Sale management
router.post("/create-sale", protect, adminVerify, createSaleController);
router.patch("/update-sale/:id", protect, adminVerify, updateSaleController);
router.delete("/delete-sale/:id", protect, adminVerify, deleteSaleController);
router.get("/get-sales/:shopId", protect, adminVerify, shopAccess, getAllSalesController);
router.get("/get-sale/:id", protect, adminVerify, getSingleSaleController);
router.get("/get-due-sales", protect, adminVerify, getDueSalesController);
router.patch("/update-due-sale/:id", protect, adminVerify, updateDueSaleController);

export default router;
