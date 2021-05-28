import Bootcamp from '../models/Bootcamps.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middlewares/async.js';
import geocoder from '../utils/geocoder.js';

// @desc    Get all bootcamp
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = asyncHandler(async (req, res, next) => {
  //query params
  // const bootcamps = await Bootcamp.find(req.query);
  // {{URL}}api/v1/bootcamps?averageCost[lte]=10000
  console.log(req.query);
  let query;

  const reqQuery = { ...req.query };

  const removeFields = ['select'];

  removeFields.forEach((param) => delete reqQuery[param]);

  if (req.query.select) {
    const fields = req.query.select.replace(',', ' ');
    console.log(fields);
    query = query.select(fields);
  }

  console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);

  console.log(queryStr);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in|ne)\b/g,
    (match) => `$${match}`
  );

  console.log(queryStr);

  query = Bootcamp.find(JSON.parse(queryStr));

  const bootcamps = await query;

  res
    .status(200)
    .json({ succes: true, count: bootcamps.length, data: bootcamps });
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps:id
// @access  Public
export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ succes: true, data: bootcamp });
});

// @desc    create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res
    .status(201)
    .json({ success: true, message: 'bootcamp created', _id: bootcamp._id });
});

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps:id
// @access  Private

export const updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`resource not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});
// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps:id
// @access  Private

export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`resource not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc    get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private

export const getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  //get lat/long from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //calc radius con radians
  //Divido distanza per il raggio della terra
  //Raggio della terra = 6.378 km
  const radius = distance / 6378;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
