const express = require('express')
const router = express.Router()
const { getAllProductsController } = require('../controllers/productController')
const { isLoggedin } = require('../middlewares/isLoggedin')


router.get("/all-products",isLoggedin,getAllProductsController)

module.exports = router