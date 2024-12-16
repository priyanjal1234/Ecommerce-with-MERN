const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.createProductController = async function (req, res) {
  try {
    let { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Product Image is required" });
    }

    let product = await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      image: req.file.path,
    });
    res.status(201).json({ message: "Product Created Successfully", product });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deleteProductController = async function (req, res) {
  let { id } = req.params;
  try {
    let deletedProduct = await productModel.findOneAndDelete({ _id: id });
    if (!deletedProduct)
      return res
        .status(401)
        .json({ message: "Error occurred while deleting the product" });
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAnalyticsController = async function (req, res) {
  try {
    let result = await orderModel.aggregate([
      {
        $match: { paymentStatus: "Paid" },
      },
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$totalPrice" },
        },
      },
    ]);
    let total = result.length > 0 ? result[0].totalSum : 0;

    let allCustomers = await userModel.find({ isAdmin: false });
    if (!allCustomers) return res.status(404).json({ message: "No Customers" });
    let allOrders = await orderModel.find({ paymentStatus: "Paid" });
    if (!allOrders) return res.status(404).json({ message: "No Orders" });

    res.status(200).json({
      total,
      allCustomers,
      allOrders,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getTotalSalesOverTime = async function (req, res) {
  try {
    let salesData = await orderModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.updateProductController = async function (req, res) {
  let { name, description, price, category, stock } = req.body;
  try {
    let product = await productModel.findOne({ _id: req.params.id });
    let updatedProduct;
    if (req.file) {
      updatedProduct = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name || product.name,
          description: description || product.description,
          price: price || product.price,
          category: category || product.category,
          stock: stock || product.stock,
          image: req.file.path,
        },
        { new: true }
      );
    } else {
      updatedProduct = await productModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name || product.name,
          description: description || product.description,
          price: price || product.price,
          category: category || product.category,
          stock: stock || product.stock,
          image: product.image,
        },
        { new: true }
      );
    }

    res.status(200).json({ message: "Product is updated successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
