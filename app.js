require('dotenv').config();
require('express-async-errors')


//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


//swagger
const swagger = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const express = require('express');
const app = express();
//connect to db
const connectToDB = require('./db/connectToDB')

//Routes
const authRouter = require('./routes/auth')
const studentRouter = require('./routes/student');
//Authentication
const authenticateUser = require('./middles/authentication')

//error handlers

const notFoundMiddleware = require('./middles/not-found')
const errorMiddleware = require('./middles/error-handler');
const errorHandlerMiddleware = require('./middles/error-handler');

app.set('trust proxy',1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
)



app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/',(req, res) => {
    res.send(`    <h1 style="text-align: center;">Student API</h1>
    <h2 style="text-align: center;"><a style="text-decoration: none;" href="/api-docs">Documentation</a></h2>`)
})
app.use('/api-docs',swagger.serve,swagger.setup(swaggerDocument))

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/student',authenticateUser,studentRouter)



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