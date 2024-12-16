const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports.registerController = async function (req, res) {
  let { name, email, password, address, phone } = req.body;

  if (!name || !email || !password || !address || !phone) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(409).json({ message: "You are already registered" });
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
      address,
      phone,
      isAdmin: email === "priyanjalsaxena7@gmail.com" ? true : false,
    });
    let token = jwt.sign({ name, email }, process.env.JWT_KEY);
    res.cookie("token", token, {
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'None'
    });
    res.status(201).json({ message: "Registration Successfull", user });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.loginController = async function (req, res) {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields are required" });
  }

  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
        res.cookie("token", token, {
          
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'None'
        });
        return res.status(200).json({ message: "You are logged in" });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.logoutController = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getLoggedinUserController = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.updateLoggedinUserController = async function (req, res) {
  let { name, address, phone } = req.body;
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let updatedUser = await userModel.findOneAndUpdate(
      { email: req.user.email },
      {
        name: name || user.name,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );
    if (!updatedUser)
      return res.status(401).json({ message: "Error updating the user" });
    res
      .status(200)
      .json({ message: "Profile is updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.forgotPasswordController = async function (req, res) {
  let { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with this email not found" });
    let resettoken = crypto.randomBytes(10).toString("hex");
    user.resetPasswordToken = resettoken;
    await user.save();

    let reseturl = `http://localhost:5173/reset-password?token=${resettoken}`;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: String(process.env.USER_EMAIL),
        pass: String(process.env.USER_PASS),
      },
    });

    let mailOptions = {
      from: "Ecommerce",
      to: email,
      subject: "Password Reset Request",
      html: `
          <p>Hello,</p>
          <p>You requested to reset your password. Please click on the link below to reset it:</p>
          ${reseturl}
        `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message:
        "Password reset email sent successfully. Please check your inbox.",
      
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.resetPasswordController = async function (req, res) {
  let { token } = req.params;
  let { password } = req.body;

  if (!password)
    return res.status(400).json({ message: "Password is required" });

  try {
    let user = await userModel.findOne({ resetPasswordToken: token });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with the reset token not found" });
    let newSalt = await bcrypt.genSalt(10);
    let newHash = await bcrypt.hash(password, newSalt);
    user.password = newHash;
    user.resetPasswordToken = null;
    await user.save();
    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
