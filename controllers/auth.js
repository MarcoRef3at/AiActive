const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const Errorresponse = require('../utils/errorResponse');

// @desc        Register user
// @route       POST /api/v1/auth/register
// @access      Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  //create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Validate email & Password
  if (!email || !password) {
    return next(new Errorresponse('Please Provide an Email and Password', 400));
  }
  
  //check for user
  const user = await User.findOne({ email }).select('+password');
  if(!user){
    return next(new Errorresponse('Invalid Credentials', 401));
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if(!isMatch){
    return next(new Errorresponse('Invalid Credentials', 401));
  }
  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
