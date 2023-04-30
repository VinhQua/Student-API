require('dotenv').config();
require('express-async-errors')


//extra security packages



//swagger


const express = require('express');
const app = express();
//connect to db
const connectToDB = require('./db/connectToDB')

//Routes
const authRouter = require('./routes/auth')

//Authentication


//error handlers


//extra packages
const notFoundMiddleware = require('./middles/not-found')
const errorMiddleware = require('./middles/error-handler');
const errorHandlerMiddleware = require('./middles/error-handler');



app.use(express.static('./client/build'))
app.use(express.json())
//routes
app.use('/api/v1/auth',authRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;
const start= async ()=>{
    try {
        await connectToDB(process.env.MONGO_URI)
        app.listen(port,()=> console.log(`listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()