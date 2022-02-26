const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all inventory
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from inventory');
    res.status(StatusCodes.OK).json(result);
});

// add new inventory
router.post('/',async (req, res, next) => {
    const newItem = req.body;
    console.log(newItem);
    const result = await db.query(`
        INSERT INTO inventory (part_name, unit_price, quantity, value)
        VALUES ('${newItem.part_name}', '${newItem.unit_price}', 
        '${newItem.quantity}', '${newItem.unit_price * newItem.quantity}');
    `);
    res.status(StatusCodes.OK).json(result);
});

module.exports = router