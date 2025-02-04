const boom = require('@hapi/boom');
const withErrorStack = require('../utils/withErrorStack');

module.exports = {
	logErrors,
	wrapErrors,
	errorHandler,
}

function logErrors(err, req, res, next) { //Middleware que solo muestra el error en la consola
  console.error(err);
  next(err);
}

//Simplementa ahora cada que tenemos un error, lo convertimos a un error de boom
function wrapErrors(err, req, res, next) { 
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

/*
CON BOOM YA NO NESESITAMOS ESTE WRAPEO
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
*/

function errorHandler(err, req, res, next) {
	const { stack, output } = err;
	res.status(output.statusCode);
	res.json(withErrorStack(output.payload, stack));
}