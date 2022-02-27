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
    const result = await db.none(`
        INSERT INTO employee (name, address, salary) VALUES ($1, $2, $3)`,
        [newUser.name, newUser.address, newUser.salary]);

    res.status(StatusCodes.OK).json(result);
});

module.exports = router