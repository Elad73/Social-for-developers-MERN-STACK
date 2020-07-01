const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('This is my MERN stack course'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on port ', PORT));
