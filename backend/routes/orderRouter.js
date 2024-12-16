const express = require('express')
const router = express.Router()
const { createOrderController, getUserOrderController, cancelOrderController } = require('../controllers/orderController')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.post("/order/create",isLoggedin,createOrderController)

router.get("/user/order",isLoggedin,getUserOrderController)

router.post("/cancel/order",isLoggedin,cancelOrderController)

module.exports = router