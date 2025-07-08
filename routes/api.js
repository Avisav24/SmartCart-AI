const express = require("express");
const router = express.Router();
const recommendProducts = require("../utils/recommendation");
const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

// GET /api/recommendations
router.get("/recommendations", async (req, res) => {
  try {
    // 1. Load user data from file (ensure correct path)
    const userFilePath = path.join(__dirname, "..", "user.json");
    const userData = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

    // 2. Fetch products from MongoDB
    const productDB = await Product.find({}).lean();
    if (!productDB || productDB.length === 0) {
      throw new Error("No products found in database");
    }

    // 3. Call AI logic
    const recommendations = recommendProducts(
      userData.history || [],
      userData.cart || [],
      productDB
    );

    // 4. Send response
    res.json({ success: true, recommendations });
  } catch (err) {
    console.error("Detailed Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
