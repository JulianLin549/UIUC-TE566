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
    const employeeId = req.body.employee_id;
    console.log(employeeId);

    res.status(StatusCodes.OK).json(employeeId);
});


module.exports = router