const orderModel = require("../models/order-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.createOrderController = async function (req, res) {
  let { fullName, email, address, city, state, zipCode, items, totalPrice } =
    req.body;
  try {
    for (const item of items) {
      const { product, quantity } = item;

      let productFound = await productModel.findById(product);
      if (!productFound) {
        return res
          .status(404)
          .json({ message: `Product with id ${product} not found` });
      }
      if (productFound.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${productFound.name}. Available: ${productFound.stock}, Required: ${quantity}`,
        });
      }
    }

    let order = await orderModel.create({
      fullName,
      email,
      address,
      city,
      state,
      zipCode,
      items,
      totalPrice,
    });

    for (const item of items) {
      const { product, quantity } = item;
      let productFound = await productModel.findById(product);
      productFound.stock -= quantity;
      await productFound.save();
    }

    return res
      .status(201)
      .json({ message: "Order Created Successfully", order });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserOrderController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let order = await orderModel.findOne({ fullName: user.name });
    if (!order)
      return res.status(404).json({ message: "Order not found for this user" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.cancelOrderController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let orderstobecanceled = await orderModel.find({ fullName: user.name });
    orderstobecanceled.forEach(async function(order) {
      order.status = "Canceled"
      await order.save()
    })
    res.status(200).json({ message: "Order Canceled Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
