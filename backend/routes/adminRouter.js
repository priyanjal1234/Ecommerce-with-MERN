const express = require("express");
const router = express.Router();
const { isLoggedin } = require("../middlewares/isLoggedin");
const { isAdmin } = require("../middlewares/isAdmin");
const {
  createProductController,
  deleteProductController,
  getAnalyticsController,
  getTotalSalesOverTime,
  updateProductController,
} = require("../controllers/adminController");
const upload = require("../config/multerConfig");

router.post(
  "/product/create",
  isLoggedin,
  isAdmin,
  upload.single("image"),
  createProductController
);

router.put(
  "/update/product/:id",
  isLoggedin,
  isAdmin,
  upload.single("image"),
  updateProductController
);

router.delete("/delete/:id", isLoggedin, isAdmin, deleteProductController);

router.get("/analytics", isLoggedin, isAdmin, getAnalyticsController);

router.get("/sales", isLoggedin, isAdmin, getTotalSalesOverTime);

module.exports = router;
