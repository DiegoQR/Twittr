const config = require('../../config');

module.exports = {
	logErrors,
	wrapErrors,
	errorHandler,
}

function withErrorStack(error, stack) {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) { //Middleware que solo muestra el error en la consola
  console.error(err);
  next(err);
}

function wrapErrors(err, req, res, next) { //Envuelve el error en un formato que yo nesesite
  const badImplementationError = {
    stack: err.stack,
    output: {
      statusCode: 500,
      payload: {
        error: "Internal Server Error",
        message: err.message,
      },
    },
  };

  next(badImplementationError);
}

function errorHandler(err, req, res, next) {
	const { stack, output } = err;
	res.status(output.statusCode);
	res.json(withErrorStack(output.payload, stack));
}