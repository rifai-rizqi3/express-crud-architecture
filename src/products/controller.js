const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
};

const addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;
  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      description,
      image,
    },
  });
  res.send({ data: newProduct, message: "Produk berhasil ditambahkan" });
};

module.exports = {
  getProducts,
  addProduct,
};
