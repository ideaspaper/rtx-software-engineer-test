function errorHandlerMiddleware(error, req, res, next) {
  let status;
  let message;

  if (error.name === 'FailedToFetchFromAPI') {
    status = 500;
    message = 'failed to fetch from api';
  } else if (error.name === 'FailedToFetchSomeFacts') {
    status = 500;
    message = 'failed to fetch some facts';
  } else {
    status = 500;
    message = 'internal server error';
  }

  res.status(status).json({ message });
}

export default errorHandlerMiddleware;
