const express = require('express'),
    apiRouter = express.Router();

apiRouter.use('/employee', require('./employee'));
apiRouter.use('/customer', require('./customer'));
apiRouter.use('/inventory', require('./inventory'));
apiRouter.use('/invoice', require('./invoice'));
apiRouter.use('/payroll', require('./payroll'));
apiRouter.use('/vendor', require('./vendor'));
apiRouter.use('/purchase-order', require('./purchase_order'));
apiRouter.use('/settlement', require('./settlement'));
apiRouter.use('/sheet', require('./sheet'));


module.exports = apiRouter