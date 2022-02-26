const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all users
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from employee');
    res.status(StatusCodes.OK).json(result);
});

// add new user
router.post('/',async (req, res, next) => {
    const newUser = req.body;
    console.log(newUser);
    const result = await db.query(`
        INSERT INTO employee (first_name, last_name, address, city, state, salary)
        VALUES ('${newUser.first_name}', '${newUser.last_name}', 
        '${newUser.address}', '${newUser.city}', '${newUser.state}', '${newUser.salary}');
    `);
    res.status(StatusCodes.OK).json(result);
});

module.exports = router