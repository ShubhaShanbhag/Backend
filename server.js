const express = require('express');
const route = require('./config/route')
const cors =require ('cors')
require('./config/mongoose')
require('dotenv').config()
const app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({extended: false}))

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(4500,()=>{
    console.log('listening on port 4500');
})