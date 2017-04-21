/**
 * Parses a base64 encoded bearer token from the HTTP `Authorization` header (see RfC6750).
 */
const bearerTokenParserMiddleware = (request, response, next) => {
  // (Not production-ready)

  const authorizationHeader = request.headers['authorization'];
  if (!authorizationHeader) {
    next();
    return;
  }

  const [ _, base64EncodedToken ] = authorizationHeader.match(/Bearer (.+)/);

  if (!base64EncodedToken) {
    next();
    return;
  }

  // Decode base64
  const token = Buffer.from(base64EncodedToken, 'base64').toString('utf8');

  // Save on request object
  request.bearerToken = token;

  next();
};


module.exports = bearerTokenParserMiddleware;
