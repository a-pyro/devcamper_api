// @desc    Get all bootcamp
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = (req, res, next) => {
  res.send('hello');
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps:id
// @access  Public
export const getBootcamp = (req, res, next) => {};

// @desc    create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = (req, res, next) => {};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps:id
// @access  Private

export const updateBootcamp = (req, res, next) => {};
// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps:id
// @access  Private

export const deleteBootcamp = (req, res, next) => {};
