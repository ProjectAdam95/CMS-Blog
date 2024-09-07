

// Handle form submission for editing a post
document.querySelector('#edit-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const postId = window.location.pathname.split('/').pop();  // Extract post ID from the URL
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update the post');
      }
    }
  });
  
  // Handle post deletion
  document.querySelector('#delete-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const postId = window.location.pathname.split('/').pop();  // Extract post ID from the URL
  
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete the post');
    }
  });
  