const doctorModel = require('../model/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Doctor register
const doctorRegister = async (req, res) => {
  const { firstname, lastname, email, password, specialization, date, time, experience, feePerConsultation, phoneNumber, address } = req.body;

  try {
    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new doctorModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      specialization,
      date,
      time,
      experience,
      feePerConsultation,
      phoneNumber,
      address
    });

    await newDoctor.save();

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Doctor login
const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.status(400).json({ message: "Doctor doesn't exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ id: doctor._id }, "secret");

    res.json({ token, doctorID: doctor._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  doctorRegister,
  doctorLogin
};


