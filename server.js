const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
// var cors = require('cors');
var cors = require('cors');
const whitelist = ['http://localhost:8080'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    // console.log('origin', origin);
    // if (whitelist.includes(origin)) 
    return callback(null, true);

    // callback(new Error('Not allowed by CORS'));
  },
};

//load env vars (must be before db connection)
dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');
const auth = require('./routes/auth');
const app = express();

//Preflight request (Post and get instead of OPTIONS)
// app.use(cors());
app.use(cors(corsOptions));
//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

if (process.env.Node_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/auth', auth);

//Error Handler (must be after Mount Routers)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promis rejections
process.on('unhandledRejection', (err, Promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
