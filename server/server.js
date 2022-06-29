import express from 'express';
import cors from 'cors';
import fs from 'fs'
const morgan = require('morgan');
require('dotenv').config();

//create exprress app
const app = express()

// routes
fs.readdirSync('./routes').map((route) => 
    app.use('/api', require(`./routes/${route}`))
 );

// apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));



//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
