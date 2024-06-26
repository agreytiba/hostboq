const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc  get all users
// @route GET /api/users
// @access private
const getUsers = asyncHandler(async (req, res) => {
	// get all uses detail except password
	const allUsers = await User.find({}, { password: 0 }).sort({ createdAt: -1 });

	if (allUsers) {
		res.status(200).json(allUsers);
	} else {
		res.status(500);
		throw new Error('failed to retrieve users');
	}
});

// count all users
const getCountUsers = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await User.count();
  if (!counts) {
    res.json("no documents");
  }
  res.status(200).json(counts);
});
// count all users with accessLevel user access level
const getCountWithUsers = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await User.count({accessLevel:"user"});
  if (!counts) {
    res.json("no documents");
  }
  res.status(200).json(counts);
});

// @desc  Register new user
// @route POST /api/users
// @access private

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, accessLevel, phone, profilePic } = req.body;
	if (!name || !email || !phone || !password || !accessLevel) {
		res.status(400);
		throw new Error('please add all fields');
	}
	

	//check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('email yako imeshatumika , login au tumia email nyingine kujisajiri');
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//  create user
	const user = await User.create({
		name,
		email,
		phone,
		accessLevel,
		profilePic,
		password: hashedPassword
	});
	if (user) {
		res.status(201).json({
			message:"succeful register"
		});
	} else {
		res.status(400);
		throw new Error('invalid user data');
	}
});

// @desc  authenticate a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// check for user by email
	const user = await User.findOne({ email });

	//  compare between added password and password stored in database
	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			accessLevel: user.accessLevel,
			profilePic: user.profilePic,
			token: generateToken(user._id)
		});
	} else {
		res.status(400);
		throw new Error('invalid credentials');
	}
});

// @desc  edit  user data
// @route PUT /api/users/:id
// @access private
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
	}
});

// @desc  get user data
// @route GET /api/users/:id
// @access private

const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	res.status(200).json({
		_id: user.id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		accessLevel: user.accessLevel,
		
	});
});
// @desc  Delete single user
// @route DELETE /api/users/:id
// @access private
const deleteUser = asyncHandler( async(req,res)=>{
    const user = await User.findById(req.params.id)

    // check for the mapDetail
    if(!user){
        res.status(400)
        throw new Error(' mtumiaji hayupo kwenye mfumo')
    }

    await User.findOneAndDelete(req.params.id)
    res.status(200).json("successfully deleted")
})

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
};

module.exports = {
	registerUser,
	getMe,
	getUsers,
	loginUser,
	deleteUser,
	updateUser,
	getCountUsers,
	getCountWithUsers
};
