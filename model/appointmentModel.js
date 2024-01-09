const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment/moment')

const schema = mongoose.Schema(
    {
      userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      doctorId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );
  
  const Appointment = mongoose.model("Appointment", schema);
  
  module.exports = Appointment;