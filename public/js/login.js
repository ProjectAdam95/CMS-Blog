document.querySelector('.login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Retrieve and trim values from input fields
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both fields have values
  if (username && password) {
    try {
      // Make the API call to log in
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Log the response object for debugging
      console.log('Response received:', response);

      // Check if the response status indicates success
      if (response.ok) {
        // Parse the response data
        const data = await response.json();

        // Log the successful login data
        console.log('Login successful, data:', data);
        
        // Redirect to the URL provided in the response
        if (data.redirectUrl) {
          console.log('Redirect URL:', data.redirectUrl);
          document.location.replace(data.redirectUrl);
        } else {
          console.error('Redirect URL not found in response data.');
          alert('Failed to log in.');
        }
      } else {
        // Log the error message from the server
        console.error('Login failed:', await response.text());
        alert('Failed to log in.');
      }
    } catch (err) {
      // Log any errors that occur during the fetch
      console.error('Error during login:', err);
      alert('An error occurred. Please try again.');
    }
  } else {
    // Alert if username or password is missing
    alert('Please enter both username and password');
  }
});




  