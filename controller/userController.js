const UserModel = require('../model/userModel')
const DoctorModel = require("../model/doctorModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const appointmentModel = require ("../model/appointmentModel")


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
    res.json({ token, userID: user._id, userName: user.firstname });
  };


   // get all doctors list
  const getAllDocotrsController = (req, res) => {
    DoctorModel.find()
      .then( doctors => {
        res.status(200).send({
          success: true,
          message: "Docots Lists Fetched Successfully",
          data: doctors,
        });
      })
      .catch( error => {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Errro While Fetching Docotr",
        });
      })
  };

  module.exports = {
    userRegister,
    userLogin,
    getAllDocotrsController,
  
  }

