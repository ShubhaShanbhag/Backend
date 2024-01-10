const express = require('express');
const route = require('./config/route')
const cors = require('cors')
require('./config/mongoose')
require('dotenv').config()
const app = express()
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(cors({
    origin: [3000, "http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    preflightContinue: false,
    optionsSursccessStatus: 204,
    credentials:true
}))

app.use(route)

app.listen(4500,()=>{
    console.log('listening on port 4500');
})