const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,  // Ensure the post belongs to the logged-in user
        },
      }
    );

    if (updatedPost[0] === 0) {  // Check if any rows were updated
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE post by ID
router.delete('/:id', withAuth, async (req, res) => {
  console.log(`Attempting to delete post with ID: ${req.params.id}`);
  console.log(`User ID from session: ${req.session.user_id}`);

  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,  // Ensure the post belongs to the logged-in user
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);  
  }
});

// GET single post by ID (including associated comments and the user who created the post)
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },  // Include the user who created the post
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
          attributes: ['comment_text', 'createdAt'],  // Include comment text and createdAt
        }
      ]
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    // Render the post page with the retrieved post data
    res.render('post', { 
      post, 
      loggedIn: req.session.logged_in  // Use logged_in for consistency
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


