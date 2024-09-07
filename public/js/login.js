document.querySelector('.login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Log the entire response to make sure it is received correctly
      console.log('Response received:', response);

      if (response.ok) {
        const data = await response.json();
        // Log the parsed data, including the redirectUrl
        console.log('Login successful, data:', data);
        
        // Redirect to the dashboard or the specified URL
        document.location.replace(data.redirectUrl);
      } else {
        console.error('Login failed:', await response.text());
        alert('Failed to log in.');
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  } else {
    alert('Please enter both username and password');
  }
});





  