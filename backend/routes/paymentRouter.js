const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { createPaymentIntentController, changePaymentStatusController } = require('../controllers/paymentController')

router.post("/create-payment-intent",isLoggedin,createPaymentIntentController)


module.exports = router