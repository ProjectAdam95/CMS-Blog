const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('Form submitted');  // Logs form submission

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response received:', response);  // Logs the response

      if (response.ok) {
        const data = await response.json();  // Parse JSON data from the response
        console.log('Login successful, redirecting to:', data.redirectUrl);
        document.location.replace(data.redirectUrl);  // Redirect to the dashboard
      } else {
        const errorData = await response.text();  // Logs the error response details
        console.error('Login failed:', errorData);  // Logs the failure details
        alert('Failed to log in.');
      }
    } catch (err) {
      console.error('Error during login:', err);  // Logs any errors during the request
    }
  } else {
    alert('Please enter both username and password');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);



  