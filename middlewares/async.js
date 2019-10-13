// Middleware not needed as we have used express-async-errors to handle Rejected promises. We need to
// alware catch the promises in cases of rejections otherwise it will give error.

// This middleware is called by passing route handles are its parameter, the handler gets called here
// and if it fails it calls error middleware function.

// This avoids wrapping every route handlers in try-catch block, but we should still
// remeber to use this function outside and pass handler to it, which is bit messy.

// So we use "express-async-errors". It basically wraps something like this internally.

module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
