const express = require('express'),
    apiRouter = express.Router();

apiRouter.use('/user', require('./employee'));

module.exports = apiRouter