const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 3
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  availability: {
    days: [{
      type: Object,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }],
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  },
  experience: {
    type: Number,
    required: true
  },
  feePerConsultation: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;



