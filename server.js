const express = require('express');
const connectDB = require('./config/db');
const keys = require('./config/keys');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // This attaches the 'body' to the request

app.get('/', (req, res) => res.send('This is my MERN stack course'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || keys.expressPort;

app.listen(PORT, () => console.log('Server started on port ', PORT));
