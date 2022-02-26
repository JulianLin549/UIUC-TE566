const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get invoice history
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from invoice');
    console.log(result)
    res.status(StatusCodes.OK).json(result);
});




// add new invoice
// need to add to BS and IS
// receivable
// inventory complete product reduce
// TODO
router.post('/',async (req, res, next) => {
    const invoice = req.body;
    console.log(invoice);
    const result = await db.query(`
        INSERT INTO invoice (customer_id, quantity, value, settlement)
        VALUES ('${invoice.customerId}', '${invoice.quantity}', '${invoice.value}', false);
    `);
    // need to add to BS and IS
    // receivable
    // inventory complete product reduce
    res.status(StatusCodes.OK).json(result);
});

module.exports = router