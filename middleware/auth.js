const jwt = require('jsonwebtoken')
const userAuth = (req,res,next) => {
    

}

const loginAuth = (req,res,next) => {
    if(req.cookies.jwt){
        // 
    }else{
        next()
    }
}

module.exports = {userAuth,loginAuth}