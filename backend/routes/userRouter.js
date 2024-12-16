const express = require('express')
const router = express.Router()
const { registerController, loginController, logoutController, getLoggedinUserController, updateLoggedinUserController, forgotPasswordController, resetPasswordController } = require('../controllers/userController')
const { isLoggedin } = require('../middlewares/isLoggedin')


router.post("/register",registerController)

router.post("/login",loginController)

router.get("/logout",logoutController)

router.get("/profile",isLoggedin,getLoggedinUserController)

router.put("/update/profile",isLoggedin,updateLoggedinUserController)

router.post("/forgot-password",forgotPasswordController)

router.post("/reset-password/:token",resetPasswordController)

module.exports = router