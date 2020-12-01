const Bootcamps = require('../models/Bootcamps');
const Bootcamp = require('../models/Bootcamps');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: Bootcamps.length,
      msg: 'Show all bootcamps',
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: `Error:${err.message}`,
    });
  }
};
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      msg: `Get bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: `Error:${err.message}`,
    });
  }
};
exports.creatBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      msg: `Create new bootcamp`,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: `Error:${err.message}`,
    });
  }
};
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      msg: `Update bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: `Failed to Update bootcamp ${req.params.id}`,
    });
  }
};
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      msg: `Delete bootcamp ${req.params.id}`
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: `Error:${err.message}`,
    });
  }
  
};
