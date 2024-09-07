document.querySelector('#signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();  // Prevent the form from submitting the default way

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        document.location.replace('/dashboard');  // Redirect to the dashboard after signup
      } else {
        const errorMessage = await response.text();
        console.error('Signup failed:', errorMessage);
        alert('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
    }
  } else {
    alert('Please enter both a username and a password.');
  }
});







  