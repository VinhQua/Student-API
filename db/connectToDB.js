const mongoose = require('mongoose');

const connectToDB = async(URI)=>{
    await mongoose.connect(URI);
    console.log('Connected to database')
}

module.exports = connectToDB
