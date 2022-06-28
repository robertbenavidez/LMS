import express from 'express';
import cors from 'cors';
const morgan = require('morgan');
require('dotenv').config();

//create exprress app
const app = express()

// apply middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.get('/', (req, res) => {
    // test response
    res.send('you hit the server')
})

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
