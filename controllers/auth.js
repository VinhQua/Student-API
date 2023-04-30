
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/user')
const {StatusCodes}= require('http-status-codes')
const register = async (req, res, next) =>{
    const user = await User.create({...req.body})

    const token = user.createToken()
    res.status(StatusCodes.CREATED).json({name:user.name, token:token})
}

const login = async (req, res, next) =>{

    const {email,password} = req.body
    console.log(email, password)
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
  
    const user = await User.findOne({ email: email});

    if (!user){
        throw new UnauthenticatedError('Invalid email address')
    }
    
    const isPasswordCorrect = await user.comparePassword(password);
 
    if (!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid password')
    }

    const token = user.createToken()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})

}

module.exports ={
    register,
    login
}

