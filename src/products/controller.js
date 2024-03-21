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

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send("Produk berhasil dihapus");
};


module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
