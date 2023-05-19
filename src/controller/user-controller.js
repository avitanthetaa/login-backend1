const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HTTP = require("../constant/response.constant");

const usermodel = require("../model/userModel");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await usermodel.findOne({ email });

    if (userEmail) {
      return res.status(HTTP.SUCCESS).send({
        status: true,
        code: HTTP.SUCCESS,
        message: "Email Is Already Taken",
      });
    }

    if (!userEmail) {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = { ...req.body, password: passwordHash };
      await usermodel(user).save();
      return res.status(HTTP.SUCCESS).send({
        status: true,
        code: HTTP.SUCCESS,
        message: "Entity saved successfully",
        data: user,
      });
    }
  } catch (error) {
    if (error) {
      return res.status(HTTP.BAD_REQUEST).send({
        status: true,
        code: HTTP.BAD_REQUEST,
        message: error,
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("🚀 ~ login ~  req.body:",  req.body)

    var compare = await usermodel.findOne({ email: email });
    console.log("🚀 ~ login ~ compare:", compare);

    // if (compare.verify_otp == false) {
    //   return res.status(HTTP.SUCCESS).send({
    //     status: true,
    //     code: HTTP.SUCCESS,
    //     message: "You are not verify for login because your otp not verify",
    //   });
    // }

    bcrypt.compare(password, compare.password, (err, result) => {
      if (result == true) {
        const token = jwt.sign(
          { id: compare._id, email: compare.email },
          process.env.SECRET_KEY
        );
        return res.status(HTTP.SUCCESS).send({
          status: true,
          code: HTTP.SUCCESS,
          message: "Login successfully",
          data: token,
        });
      } else {
        return res.status(HTTP.SUCCESS).send({
          status: true,
          code: HTTP.SUCCESS,
          message: "Enter valid password",
        });
      }
    });
  } catch (error) {
    return res.status(HTTP.FORBIDDEN).send({
      status: true,
      code: HTTP.FORBIDDEN,
      message: "Email is not valid",
    });
  }
};

const getUser = async (req, res) => {
  try {
    new Promise(async (resolve, reject) => {
      try {
        const userData = await usermodel.find();
        resolve();
        return res.status(HTTP.SUCCESS).send({
          status: true,
          code: HTTP.SUCCESS,
          message: "User data found",
          data: userData,
        });
      } catch (error) {
        reject();
      }
    });
  } catch (error) {
    return res.status(HTTP.FORBIDDEN).send({
      status: true,
      code: HTTP.FORBIDDEN,
      message: "Data not found",
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
  //   encodeReqData,
  //   decodeResData,
};
