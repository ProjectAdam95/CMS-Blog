const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log('Form submitted');  // Debugging line

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response received:', response);  // Log response

      if (response.ok) {
        const data = await response.json();
        console.log('Redirecting to:', data.redirectUrl);  // Log the redirect URL
        document.location.replace(data.redirectUrl);
      } else {
        console.error('Login failed');
        alert('Failed to log in.');
      }
    } catch (err) {
      console.error('Error during login:', err);  // Log any errors
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);




  