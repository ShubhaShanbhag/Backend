const jwt = require('jsonwebtoken')
const userAuth = (req,res,next) => {
    if(req.cookies.jwt){
        jwt.verify(req.cookies.jwt,"this is secret baby", function(err,decodedUser){
            if(err){
                console.log('There is an issue with jwt');
            } else {
                res.locals.firstname = decodedUser.user.firstname;
                res.locals.id = decodedUser.user._id;
            }
        } )
        next()
    }
    else{
        res.redirect('/login')
    }
}

const loginAuth = (req,res,next) => {
    if(req.cookies.jwt){
        res.redirect('/')
    }else{
        next()
    }
}

module.exports = {userAuth,loginAuth}