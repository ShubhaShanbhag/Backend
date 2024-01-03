const express = require('express');
const route = require('./config/route')
require('./config/mongoose')
require('dotenv').config()
const app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.use(express.json())
app.use(express.static('public'))
app.use(route)

app.listen(3000,()=>{
    console.log('listening on port 3000');
})