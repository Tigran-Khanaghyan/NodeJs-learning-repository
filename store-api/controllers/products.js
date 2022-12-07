const Product = require("../models/product");

const getAllProductsStatic = (req, res) => {
  res.status(200).json({ msg: "all static products" });
};

const getAllProducts = async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  const products = await Product.find(queryObject);

  res.status(200).json({ products, count: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
