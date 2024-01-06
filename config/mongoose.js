//mongoose.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mmfinalproject24:finalproject24@cluster0.ffyopr5.mongodb.net/')
.then(res =>{console.log('DB is connected')})
.catch(err => {console.log(err)});


