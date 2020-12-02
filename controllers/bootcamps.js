const Bootcamp = require('../models/Bootcamps');
const asyncHandler = require('../middleware/async');
const Errorresponse = require('../utils/errorResponse');
// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // replaced try and catch with asyncHandler

  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    msg: 'Show all bootcamps',
    data: bootcamps,
  });
});
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  // try {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    // return res.status(400).json({
    //   success: false,
    // });
    return next(
      new Errorresponse(`Bootcamp Not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Get bootcamp ${req.params.id}`,
    data: bootcamp,
  });
  // } catch (err) {
  // res.status(400).json({
  //   success: false,
  //   msg: `Error:${err.message}`,
  // });
  // next(err);
  // }
});
exports.creatBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Create new bootcamp`,
    data: bootcamp,
  });
});
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    // return res.status(400).json({ success: false });
    return next(
      new Errorresponse(`Bootcamp Not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
    data: bootcamp,
  });
});
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new Errorresponse(`Bootcamp Not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
});
