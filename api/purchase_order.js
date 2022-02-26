// balance payable will go up
// TODO

const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');

// get all purchase order history
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from payroll');
    res.status(StatusCodes.OK).json(result);
});

// add purchase order
// inventory should change, payable should change
// TODO
router.post('/',async (req, res, next) => {
    const newPO = req.body;
    console.log(newPO);
    const result = await db.query(`
        INSERT INTO purchase_order (part_id, part, quantity, unit_price, value)
        VALUES ('${newPO.part_id}', '${newPO.quantity}', '${newPO.unit_price}', '${newPO.unit_price * newPO.quantity}');
    `);
    res.status(StatusCodes.OK).json(result);
});
