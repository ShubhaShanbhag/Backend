  const AppointmentModel = require('../model/appointmentModel')
  //const doctorModel = require('../model/doctorModel')

//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
    try {
      req.body.status = "pending";
      const newAppointment = new AppointmentModel(req.body);
        await newAppointment.save();
        res.status(200).send({
          success: true,
          message: "Appointment Book succesfully",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While Booking Appointment",
        });
      }
    };

    //get all appointments 

    const getallappointments = async (req, res) => {
      try {
        const keyword = req.query.search
          ? {
              $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
            }
          : {};
    
        const appointments = await AppointmentModel.find(keyword)
          .populate("doctorId")
          .populate("userId");
        return res.send(appointments);
      } catch (error) {
        res.status(500).send("Unable to get apponintments");
      }
    };

    const setNewAppointment = (req, res) => {
      let newAppointment = new AppointmentModel(req.body);

      if(newAppointment) {
        newAppointment.save()
          .then(() => {
            res.send("Appointment is sent to the doctor")
          })
          .catch(err => {
            res.status(500).send(err)
          })
      }
    }
  

  module.exports= {
      bookAppointmentController,
      getallappointments,
      setNewAppointment
}