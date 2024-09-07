

document.querySelector('#logout-link').addEventListener('click', async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // Redirect to the homepage after successful logout
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
  });