const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { UnauthenticatedError } = require('../errors');



const auth = async (req,res,next) => {
    //Check Headers

    const authHeaders = req.headers.authorization;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new UnauthenticatedError('Unauthenticated Invalid')
    }

    const token = authHeaders.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        //attach the user to the job routes

        req.user = {UserID: payload.UserID,name:payload.name}

        next()
    } catch (error) {
        throw new UnauthenticatedError('Unauthenticated Invalid')
    }
}

module.exports = auth