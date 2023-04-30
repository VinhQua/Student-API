const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name'],
        minlength:[5,'The minimum length of the name is 5 characters'],
        maxlength:[50,'The maximum length of the name is 50 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter an email address'],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please enter a password'],
        minlength:[6,'The password must be at least 6 characters']
    }
})
UserSchema.pre('save', async function (){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createToken = function(){
    return jwt.sign({UserID:this._id,name:this.name},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_LIFETIME
        }
        );

}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}
module.exports =mongoose.model('User',UserSchema)