const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient

dotenv.config();
const PORT = process.env.PORT;

app.get('/api', (req, res) => {
  res.send('Selamat Datang di API ini!');
});

app.get('/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});