/**
 * Custom error handler middleware.
 *
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function errorHandlerMiddleware(error, req, res, next) {
  let status;
  let message;

  if (error.name === 'NotFound') {
    status = 404;
    message = 'not found';
  } else if (error.name === 'FailedToFetchFromAPI') {
    status = 500;
    message = 'failed to fetch from api';
  } else if (error.name === 'FailedToFetchAllFacts') {
    status = 500;
    message = `failed to fetch all facts`;
  } else {
    status = 500;
    message = 'internal server error';
  }

  res.status(status).json({ message });
}

export default errorHandlerMiddleware;
