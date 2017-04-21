const expressApp = require('./');
const config = require('./config');

expressApp.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);    // TODO: Use proper logger
});
