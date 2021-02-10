const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Chat = require('../../models/Chat');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');


router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.notEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newChat = new Chat({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const chat = await newChat.save();

      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find().sort({ date: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    res.json(chat);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});


router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    if (chat.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await chat.remove();

    res.json({ msg: 'Chat removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (chat.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Chat already liked' });
    }

    chat.likes.unshift({ user: req.user.id });

    await chat.save();

    return res.json(chat.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Chat has not yet been liked' });
    }

    chat.likes = chat.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await chat.save();

    return res.json(chat.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const chat = await Chat.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      chat.comments.unshift(newComment);

      await chat.save();

      res.json(chat.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    const comment = chat.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
 
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    chat.comments = chat.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await chat.save();

    return res.json(chat.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
