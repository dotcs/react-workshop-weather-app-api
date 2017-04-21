const express = require('express');
const cors = require('cors');
const bearerTokenParserMiddleware = require('./middleware/bearer-token-parser');
const authMiddleware = require('./middleware/auth');

const app = express();

// Middlewares
app.use(bearerTokenParserMiddleware);
app.use(authMiddleware);
app.use(cors());

// Router
const router = require('./router');
app.use(router);


module.exports = app;
