const productModel = require("../models/product-model");

module.exports.getAllProductsController = async function (req, res) {
  try {
    let allProducts = await productModel.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
