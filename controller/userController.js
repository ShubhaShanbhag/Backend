const UserModel = require('../model/userModel')
const DoctorModel = require("../model/doctorModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const appointmentModel = require ("../model/appointmentModel")


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
  
  //BOOK APPOINTMENT
  // const bookAppointmnetController = async (req, res) => {
  //   try {
  //     req.body.status = "pending";
  //     const newAppointment = new appointmentModel(req.body);
  //     await newAppointment.save();
  //     const user = await UserModel.findOne({ _id: req.body.doctorInfo.userId });
  //     user.notifcation.push({
  //       type: "New-appointment-request",
  //       message: `A new Appointment Request from ${req.body.userInfo.name}`,
  //       onCLickPath: " ./pages/BookAppointment ",
  //     });
  //     await user.save();
  //     res.status(200).send({
  //       success: true,
  //       message: "Appointment Book succesfully",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       success: false,
  //       error,
  //       message: "Error While Booking Appointment",
  //     });
  //   }
  // };

  // booking bookingAvailabilityController
//  const bookingAvailabilityController = async (req, res) => {
//   try {
//     const date = moment(req.body.date, "DD-MM-YY").toISOString();
//     const fromTime = moment(req.body.time, "HH:mm")
//       .subtract(1, "hours")
//       .toISOString();
//     const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
//     const doctorId = req.body.doctorId;
//     const appointments = await appointmentModel.find({
//       doctorId,
//       date,
//       time: {
//         $gte: fromTime,
//         $lte: toTime,
//       },
//     });
//     if (appointments.length > 0) {
//       return res.status(200).send({
//         message: "Appointments not Availibale at this time",
//         success: true,
//       });
//     } else {
//       return res.status(200).send({
//         success: true,
//         message: "Appointments available",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error In Booking",
//     });
//   }
//   };
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Assuming you want to send specific properties of the doctor, adjust as needed
    const { _id, firstname, lastname, phoneNumber, address } = doctor;
    res.json({ _id, firstname, lastname, phoneNumber, address });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getAllDocotrsController,
  getDoctorByIdController,
    // bookAppointmnetController,
    // bookingAvailabilityController

  }

