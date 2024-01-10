 const express = require('express');
 const route = express.Router();
 const doctorController = require('../controller/doctorController')
 const userController = require('../controller/userController')
 const auth = require('../middleware/auth')

// login and register
 route.post('/register/Doctor', doctorController.doctorRegister)
 route.post('/login/Doctor', doctorController.doctorLogin)
 route.post('/register/client', userController.userRegister)
 route.post('/login/client', userController.userLogin)

 //auth
 route.post("./pages/ClientHomePage", auth, authController);

 module.exports= route;