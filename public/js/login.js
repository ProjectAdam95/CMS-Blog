const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();  // Parse the response
      document.location.replace(data.redirectUrl);  // Redirect to dashboard
    } else {
      alert('Failed to log in.');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);





  