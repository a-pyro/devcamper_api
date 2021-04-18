import Bootcamp from '../models/Bootcamps.js';

// @desc    Get all bootcamp
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({ succes: true, data: bootcamps });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps:id
// @access  Public
export const getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ succes: true, data: bootcamp });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, message: 'bootcamp created', _id: bootcamp._id });
  } catch (error) {
    res.status(400).json({
      succes: false,
    });
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps:id
// @access  Private

export const updateBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json({ success: true, data: bootcamp });
};
// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps:id
// @access  Private

export const deleteBootcamp = async (req, res, next) => {};
