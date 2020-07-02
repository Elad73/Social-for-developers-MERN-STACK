const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const router = express.Router();

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post(
    '/',
    [auth, [check('text', 'Text is required').not().isEmpty()]],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }

            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                author: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();
            res.json(post);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  GET api/posts
// @desc   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); // The sort -1 means 'the most recent one'
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/posts/:id
// @desc   Get post by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).send({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/:id
// @desc   Delete a post by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check user to validate delete
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: 'User not aurhorized' });
        }

        // Check is post exist
        if (!post) {
            return res.status(404).send({ msg: 'Post not found' });
        }

        await post.remove();
        res.json({ msg: 'Post deleted' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).send({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
