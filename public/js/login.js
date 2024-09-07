const loginFormHandler = async (event) => {
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

      if (response.ok) {
        console.log('Login successful! Redirecting...');
        document.location.replace('/dashboard');  // Redirect to dashboard after login
      } else {
        const errorData = await response.json();  // Parse response error
        console.error('Login failed:', errorData);
        alert(`Failed to log in: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      alert('An error occurred. Please try again.');
    }
  } else {
    alert('Please enter both username and password.');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);




  