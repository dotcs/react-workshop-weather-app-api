const authMiddleware = (request, response, next) => {
  const token = request.bearerToken;

  if (!token) {
    response.status(401).json({ message: 'No API token provided via HTTP header' });
    return;
  }

  // TODO: Authenticate user
  console.log('Token:', token);

  next();
};


module.exports = authMiddleware;
