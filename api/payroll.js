const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');

// get all payroll history
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from payroll');
    res.status(StatusCodes.OK).json(result);
});

// pay employee
// TODO
router.post('/',async (req, res, next) => {
    const payroll = req.body;

    const result = await db.query(`
        INSERT INTO payroll (employee_id, amount)
        VALUES ('${payroll.employeeId}', '${payroll.amount}');
    `);
    res.status(StatusCodes.OK).json(result);
});


module.exports = router