const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { addToCartController, getCartProductsController,getUserCartController, removeFromCartController, deleteCartProductController, deleteAllCartProductsController  } = require('../controllers/cartController')

router.post("/add",isLoggedin,addToCartController)

router.post("/remove",isLoggedin,removeFromCartController)

router.get("/user/cart",isLoggedin,getCartProductsController)

router.get("/loggedin/cart",isLoggedin,getUserCartController)

router.delete("/delete/cart/product/:id",isLoggedin,deleteCartProductController)

router.post("/all-cart-delete",isLoggedin,deleteAllCartProductsController)

module.exports = router