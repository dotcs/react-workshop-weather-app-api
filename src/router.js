/**
 * Endpoint definitions and HTTP request handlers.
 */

const express = require('express');
const currentWheather = require('./business-logic/current-weather');
const { createHandler } = require('./util');


const router = express.Router();

router.get('/current', createHandler(_httpRequest =>
	currentWheather.getAll()
));

router.get('/current/:locationId', createHandler(httpRequest =>
	currentWheather.get({
		locationId: httpRequest.params.locationId
	})
));


module.exports = router;
