// Client-side code (public/js/signup.js)

document.querySelector('.signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      // Use fetch or axios to send POST request to the server
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to dashboard on successful signup
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    alert('Please enter both a username and password');
  }
});




  