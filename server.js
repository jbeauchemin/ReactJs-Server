const express = require('express');
const cors = require('cors')

// Variables
const PORT = 5000;
const app = express();

//Enable CORS
app.use(cors());

//Middleware
app.use(express.json());

//Route
app.get('/', (req, res) => {
    console.log('Initial Point ');
    res.send('Initial Point...');
});

// Routes
const users = require('./routes/users');
app.use('/users', users);

// Listerner 
app.listen(PORT, () => {
    console.log(`App listening on port  ${PORT}`);
});