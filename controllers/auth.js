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
  sendTokenResponse(user, 200, res);
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
  if (!user) {
    return next(new Errorresponse('Invalid Credentials', 401));
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new Errorresponse('Invalid Credentials', 401));
  }

  //Create Token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({ success: true, token });
  sendTokenResponse(user, 200, res);
});

//Get Token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create Token
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60 * 60 * 24
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
