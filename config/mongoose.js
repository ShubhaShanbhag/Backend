//mongoose.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://wafa:1234@cluster0.rilnusk.mongodb.net/wafa?retryWrites=true&w=majority')
.then(res =>{console.log('DB is connected')})
.catch(err => {console.log(err)});


