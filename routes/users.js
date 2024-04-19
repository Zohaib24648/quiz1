const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const SECURITY_KEY = 'ZohaibMughal';  // Directly defined, used for JWT


router.post('/signup', async (req, res) => {
    const { name, email, password, admin = false } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, admin });

    try {
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Authentication failed');
    }
    const token = jwt.sign({ userId: user._id, admin: user.admin }, SECURITY_KEY);
    res.json({ token });
});

module.exports = router;
