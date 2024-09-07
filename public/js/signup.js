const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();  // Parse the response
      document.location.replace(data.redirectUrl);  // Redirect to dashboard
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);





  