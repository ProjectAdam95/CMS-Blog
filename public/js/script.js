// Handles new post submission
const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard after posting
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  // Handles new comment submission
  const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post-id').value;
  
    if (comment_text) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload(); // Reload the page to show the new comment
      } else {
        alert('Failed to add comment');
      }
    }
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
  document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
  