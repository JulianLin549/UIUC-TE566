// balance sheet
// income statement
// get all purchase order history
// TODO

const express = require('express'),
    router = express.Router();

router.get('/balance-sheet',async (req, res) => {
    console.log('BS');
    res.status(StatusCodes.OK).json();
});

router.get('/income-statement',async (req, res) => {
    console.log('IS');
    res.status(StatusCodes.OK).json();
});
module.exports = router