const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
//load env vars (must be before db connection)
dotenv.config({ path: './config/config.env' });

//Connect to Database
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

//Body parser
app.use(express.json());

if (process.env.Node_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps);

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
