const expressApp = require('./express-app');
const config = require('./config');

expressApp.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);    // TODO: Use proper logger
});
