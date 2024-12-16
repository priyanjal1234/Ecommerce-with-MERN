const stripe = require("../config/stripe");
const cartModel = require("../models/cart-model");
const orderModel = require("../models/order-model");
const userModel = require("../models/user-model");

module.exports.createPaymentIntentController = async function (req, res) {
  let { amount } = req.body;
  let user = await userModel.findOne({ email: req.user.email });
  try {
    let paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
    });

    if (paymentIntent) {
      let orders = await orderModel.find({ fullName: user.name });
      orders.forEach(async function (order) {
        order.paymentStatus = "Paid";
        await order.save();
      });

      let deletedCart = await cartModel.findOneAndDelete({ user: user._id });
    }
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
