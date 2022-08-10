import express from 'express';
import cors from 'cors';
import fs from 'fs'
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();

//create exprress app
const app = express()

// Database
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

  
  // apply middleware
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));
  
  // routes
  fs.readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));


//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
