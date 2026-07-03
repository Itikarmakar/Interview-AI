const userModel = require('../models/user.model');
const tokenblacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
};

/**
 * @name registerUser
 * @description Register a new user
 * @access Public
 */

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
    
        const isUserExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });
    
        if(isUserExists) {
            if(isUserExists.username === username) {
                return res.status(400).json({ message: "Username already exists" });
            }
            if(isUserExists.email === email) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }
    
        const hash = await bcrypt.hash(password, 10);
    
        const user = await userModel.create({
            username,
            email,
            password: hash
        });
        const token = generateToken(user._id);
        res.cookie('token', token, cookieOptions);
          
    
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @name loginUser
 * @description Login a user
 * @access Public
 */
const loginUser = async(req,res) =>{
    try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @name logoutUser
 * @description clear token from user cookies and add it to the blacklist
 * @access Public
 */
const logoutUser = async(req,res) => {
    try {
        const token = req.cookies.token;
        if(token){
            await tokenblacklistModel.create({ token });
        }
        res.clearCookie('token',cookieOptions)
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * @name getMe
 * @description Get the current logged-in user
 * @access Private
 */
async function getMe(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        res.status(200).json({ message: 'User details fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
};