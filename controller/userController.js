const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginPage = (req,res)=> {
    res.render('login', {err:''})
}

const signupUser = async (req,res) => {
    let hashedPassword = await bcrypt.hashSync(req.body.password, 12)
    const {firstname, email} = req.body;
    let newUSer = new User({firstname, 
        email,
        password : hashedPassword
    });
    newUSer.save()
    .then(()=>{
        res.render('login', {
            err:'You have been registered,you can go login'
        })
    })
    .catch((err)=>{
        console.log('A problem with saving user',err);
    })

}
const loginUSer = (req,res)=>{
    User.findOne({email : req.body.email})
    .then((user) => {
        if(user !== null){
            let isCorrect = bcrypt.compareSync(req.body.password, user.password)
            if(isCorrect){
              
                const userToken = jwt.sign({user},"this is secret baby")
                res.cookie('jwt', userToken)
                res.redirect('/')
            }else{
                res.render('login', {
                    err:'Password is not correct'
            })
            }
        }else{
            res.render('login', {
                err:'Couldnt find email address. You need to sign up before'
        }) }
    })
    .catch((err)=> console.log(err))
}

const logoutUser = (req,res) => {
    res.clearCookie('jwt')
    
    res.redirect('/login')
}

module.exports = {loginPage, signupUser,loginUSer,logoutUser}