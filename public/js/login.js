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

      // Log the entire response object
      console.log('Response received:', response);

      // Check if the response is OK (status 200-299)
      if (response.ok) {
        // Parse the JSON data
        const data = await response.json();

        // Log the parsed data
        console.log('Login successful, data:', data);
        
        // Check if the redirectUrl property exists
        if (data.redirectUrl) {
          // Log the redirectUrl value
          console.log('Redirect URL:', data.redirectUrl);
          
          // Redirect to the URL
          document.location.replace(data.redirectUrl);
        } else {
          console.error('Redirect URL not found in response data.');
          alert('Failed to log in.');
        }
      } else {
        // Log the error message
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





  