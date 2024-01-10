const doctorModel = require('../model/doctorModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// doctor register

    const  doctorRegister = async (req, res) => {
      console.log(req.body);
    const { firstname, lastname, password, email } = req.body;
    const doctor = await doctorModel.findOne({ email: email});
    if (doctor) {
      return res.status(400).json({ message: "Doctor name already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new doctorModel({ firstname, lastname, email, password: hashedPassword });
    await newDoctor.save();
    res.json({ message: "Doctor registered successfully" });
  };
  

  // doctor login

  const doctorLogin =  async (req, res) => {
    const { email, password } = req.body;
  
    const doctor = await doctorModel.findOne({ email });
  
    if (!doctor) {
      return res.status(400).json({ message: "Doctor doesn't exists!" });
    }
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "name or password is incorrect" });
    }
    const token = jwt.sign({ id: doctor._id }, "secret");
    res.json({ token, doctorID: doctor._id });
  };
  
  module.exports = {
    doctorRegister,
    doctorLogin
  }

