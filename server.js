


// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const secretKey = 'newproject';

const axios = require('axios');

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/login',
  headers: { 'Content-Type': 'application/json'}
};



app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware for cross-origin requests

// Generate JWT token on login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received credentials:', username, password);
  // Validate user credentials
  if (username === 'demo1' && password === 'pass') {
    // Generate a JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    console.log('generated token:', { token });
    res.status(200).json({ token,message:'Login Successful'});
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route
app.get('/protected', (req, res) => {
  // Middleware to verify JWT token
  const token = req.headers.authorization;
  
  console.log('Received token:', token); 
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, secretKey);
    res.json({ message: 'Welcome to the protected route', user: decoded.username });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

//Default route handler
app.get('/', (req, res) => {
 res.send('Welcome to the Express JWT Authentication example');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
