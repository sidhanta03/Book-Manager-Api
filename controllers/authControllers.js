const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const validator = require('validator');

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, Email, and Password are required' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        

        // Check for existing user by username or email
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email already exists' });
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Check if both fields are present
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { register, login };
