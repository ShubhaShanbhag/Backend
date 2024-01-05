const jwt = require('jsonwebtoken')
const userAuth = (req,res,next) => {
    
    
    }
    else{
        res.redirect('/login')
    }


const loginAuth = (req,res,next) => {
    if(req.cookies.jwt){
        res.redirect('/')
    }else{
        next()
    }
}

module.exports = {userAuth,loginAuth}