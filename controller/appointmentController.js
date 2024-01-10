// const Appointment = require("../models/appointmentModel");
// const userModel = require("../models/userModel");

// const getallappointments = async (req, res) => {
//   try {
//     const keyword = req.query.search
//       ? {
//           $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
//         }
//       : {};


//     const appointments = await Appointment.find(keyword)
//       .populate("doctorId")
//       .populate("userId");
//     return res.send(appointments);
//   } catch (error) {
//     res.status(500).send("Unable to get apponintments");
//   }
// };

// const bookappointment = async (req, res) => {
//   try {
//     const appointment = await Appointment({
//       date: req.body.date,
//       time: req.body.time,
//       doctorId: req.body.doctorId,
//       userId: req.locals,
    
