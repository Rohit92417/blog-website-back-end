const CryptoJS = require("crypto-js");
const User = require("../models/user"); //User Model
const JWT = require("jsonwebtoken");

//Register
exports.create = async (req, res) => {
  var checkPasswordLenght = req.body.password;
  if (checkPasswordLenght.length <= 15 && checkPasswordLenght.length >= 8) {
    try {
      var pass = checkPasswordLenght;
      const createNewUser = await new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(pass, process.env.SECRET_KEY).toString(),
        address: req.body.address,
      }).save();
      res
        .status(201)
        .json({ createNewUser, message: "User create successfully" });
    } catch (error) {
      res.status(500).json({
        error,
        message: "Something went wrong",
      });
    }
  } else {
    res
      .status(400)
      .json("password length must be 8 character and maximum 15 character");
  }
};
//Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("Email address is wrong");
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    originalText !== req.body.password &&
      res.status(401).json("Password is wrong");

    const accessToken = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const { password, ...info } = user._doc;
    res.status(200).json({ info, accessToken });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
