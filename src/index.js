const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const productRoute = require("./products/route");

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json()); // Middleware for parsing JSON bodies

// GET Endpoint untuk menampilkan selamat datang di API
app.get("/api", (req, res) => {
  res.send("Selamat Datang di API ini!");
});


app.use(productRoute);

// GET Endpoint untuk menampilkan semua produk
// app.get("/products", async (req, res) => {
//   const products = await prisma.product.findMany();
//   res.send(products);
// });


// POST Endpoint untuk menambahkan produk baru
// app.post("/products", async (req, res) => {
//   const { name, price, description, image } = req.body;
//   const newProduct = await prisma.product.create({
//     data: {
//       name,
//       price,
//       description,
//       image,
//     },
//   });
//   res.send({ data: newProduct, message: "Produk berhasil ditambahkan" });
// });

// PUT Endpoint untuk memperbarui produk berdasarkan ID
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      price,
      description,
      image,
    },
  });
  res.json(updatedProduct);
});

// PATCH Endpoint untuk memperbarui sebagian informasi produk berdasarkan ID
app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  const updatedProduct = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name ? name : undefined,
      price: price ? price : undefined,
      description: description ? description : undefined,
      image: image ? image : undefined,
    },
  });
  res.json(updatedProduct);
});

// DELETE Endpoint untuk menghapus produk berdasarkan ID
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send("Produk berhasil dihapus");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
