const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator'); // The check is a middleware of validators, that comes in an array
const User = require('../../models/User.js');
const keys = require('../../config/keys');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists' }]
                }); // The reason I'm returning the error like so, is because of the errors array returned from the validators, to make it unified
            }

            const avatar = gravatar.url(email, {
                s: '200', // size
                r: 'pg', // rating
                d: 'mm' // default
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save(); // anything that returns a promise you make sure there is an await before it.

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                keys.jwtSecret,
                { expiresIn: keys.jwtExpiration },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
