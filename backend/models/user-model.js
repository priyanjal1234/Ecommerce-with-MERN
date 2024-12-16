const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    phone: {
      type: Number,
      required: true,
    },
    resetPasswordToken : String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user",userSchema)
