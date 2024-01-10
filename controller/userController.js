const UserModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// client register

const  userRegister = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ firstname, lastname, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  };
  

  // client login

  const userLogin =  async (req, res) => {
    const { email, password } = req.body;
  
    const user = await UserModel.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  };

// authorizarion
  const authController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: {
            name: user.name,
            email: user.email,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };

  // //getUserInfo controller
  
  //   const getUserInfoController = async (req, res) => {
  //     try {
  //       const user = await UserModel.findOne({ userId: req.body.userId });
  //       res.status(200).send({
  //         success: true,
  //         message: "user data fetch success",
  //         data: user,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).send({
  //         success: false,
  //         error,
  //         message: "Error in Fetching Doctor Details",
  //       });
  //     }
   // };

      // update user profile
      const updateProfileController = async (req, res) => {
        try {
          const user = await UserModel.findOneAndUpdate(
            { userId: req.body.userId },
            req.body
          );
          res.status(201).send({
            success: true,
            message: "user Profile Updated",
            data: user,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
          success: false,
          message: "user Profile Update issue",
          error,
        });
      }
    };


  
  module.exports = {
    userRegister,
    userLogin,
    updateProfileController,
    authController
  }

