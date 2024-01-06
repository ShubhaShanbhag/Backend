const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const signupUser = async (req,res) => {
    let hashedPassword = await bcrypt.hashSync(req.body.password, 12)
    const {firstname, email} = req.body;
    let newUSer = new User({firstname, 
        email,
        password : hashedPassword
    });
    newUSer.save()
    .then(()=>{
        // 
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
                
            }else{
                // 
            }
        }else{
            // 
        }
    })
    .catch((err)=> console.log(err))
}

module.exports = {signupUser,loginUSer}