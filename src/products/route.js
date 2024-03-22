const express = require("express");
const router = express.Router();
const Controller = require("./controller");

// GET Endpoint untuk menampilkan semua produk
router.get("/products", Controller.getProduct);
router.post("/products", Controller.addProduct);
router.put("/products/:id", Controller.updateProduct);
router.delete("/products/:id", Controller.deleteProduct);

module.exports = router;
