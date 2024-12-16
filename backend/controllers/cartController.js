const cartModel = require("../models/cart-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

module.exports.addToCartController = async function (req, res) {
  let { user, product, quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ user });
    if (cart) {
      let item = cart.products.find(
        (item) => item.product.toString() === product.toString()
      );
      if (item) {
        item.quantity += quantity;
      } else {
        cart.products.push({ product, quantity });
      }
      await cart.save();
    } else {
      cart = await cartModel.create({
        user,
        products: [
          {
            product,
            quantity,
          },
        ],
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.removeFromCartController = async function (req, res) {
  let { productId } = req.body;
  try {
    let user = await userModel.findOne({ email: req.user.email });

    let cart = await cartModel.findOne({ user: user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }
    let productInCart = cart.products[productIndex];
    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
    } else {
      return;
    }

    await cart.save();
    res.status(200).json({ message: "Done" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getUserCartController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let cart = await cartModel.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getCartProductsController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let cart = await cartModel
      .findOne({ user: user._id })
      .populate("products.product");

    let cartProducts = cart?.products.map((product) => {
      return {
        product: product.product,
        quantity: product.quantity,
      };
    });

    res.status(200).json(cartProducts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deleteCartProductController = async function (req, res) {
  let { id } = req.params;
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let cart = await cartModel.findOne({ user: user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.products = cart.products.filter(
      (product) => product.product.toString() !== id.toString()
    );
    await cart.save();
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.deleteAllCartProductsController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let cart = await cartModel.findOne({ user: user._id });
    if (!cart)
      return res.status(404).json({ message: "Cart for this user not found" });
    cart.products = [];
    await cart.save();
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
