// client.js
const apiUrl = 'http://localhost:3000';

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        message:'Login successful' 
      },
      body: JSON.stringify({ username, password }),
    });
 
    const data = await response.json();
    console.log('Token:', data.token);
    
    if (data.token) {
      // Store the token in local storage
      localStorage.setItem('jwtToken', data.token);
      console.log('Token stored in local storage:', data.token);
    } else {
      console.error('Login failed:', 'Token not received');
    }
    
  } catch (error) {
    console.error('Login failed:', error.message);
  }
});
