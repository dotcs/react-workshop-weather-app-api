/**
 * Creates an Express handler from a function that accepts an Express HTTP request and returns a
 * Promise.
 *
 * @return {Function}
 */
module.exports.createHandler = promiseReturningFunction => (httpRequest, httpResponse) => {
  promiseReturningFunction(httpRequest)
    .then(result => httpResponse.json(result))
    // TODO: Error mapper (domain error -> API error)
    .catch(error => httpResponse.status(500).json({ message: error.message }));
};

/**
 * @param {Promise}
 * @return {Promise}
 */
module.exports.delayPromise = (promiseToDelay, delayMs) => {
  return new Promise(resolve => setTimeout(resolve, delayMs))
    .then(() => promiseToDelay);
};
