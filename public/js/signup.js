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
      const data = await response.json();
      document.location.replace(data.redirectUrl);  // Redirect to the dashboard
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Failed to sign up.');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);






  