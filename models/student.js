const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please provide a name']
    },
    grade:{
        type:Number,
        default:1,
    },
    cell:{
        type:String,
        required:[true,'please provide a cellphone number']
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'please provide a user id']
    },

},{timestamps:true})

module.exports  = mongoose.model('Student',StudentSchema)