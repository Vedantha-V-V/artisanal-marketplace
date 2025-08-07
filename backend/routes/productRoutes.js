const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
} = require("../controller/productControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory); // Ensure this line is correct

module.exports = router;
