// balance sheet
// income statement
// get all purchase order history
// TODO

const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


router.get('/balance-sheet',async (req, res) => {
    try{
        const inventoryValue = await db.one('select sum(value) from inventory');
        console.log(inventoryValue)
        const result = await db.one('select * from balance_sheet');
        result['inventory'] = inventoryValue.sum;
        console.log(result)
        res.status(StatusCodes.OK).json(result);
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
        console.log(e)
    }

});

router.get('/income-statement',async (req, res) => {
    try{
        const result = await db.one('select * from income_statement');
        console.log(result)
        res.status(StatusCodes.OK).json(result);
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
        console.log(e)
    }
});
module.exports = router