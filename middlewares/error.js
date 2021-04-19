import ErrorResponse from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  //loggo console for dev
  console.log(err.stack.red);

  let error = { ...err };
  error.message = err.message;
  //mongoose bad object id
  if (err.name === 'CastError') {
    const message = `resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'internal server error',
  });
};

export const routeNotFoundHandler = (req, res, next) => {
  if (!req.pathname) {
    res.status(404).send({
      message: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl} route not found`,
    });
  } else {
    next();
  }
};
