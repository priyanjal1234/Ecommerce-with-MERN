const userModel = require("../models/user-model")

module.exports.isAdmin = async function(req,res,next) {
    let user = await userModel.findOne({email: req.user.email})
    if(user.email === 'priyanjalsaxena7@gmail.com') {
        return next()
    }
    else {
        return res.status(401).json({message: "Access Denied"})
    }
}