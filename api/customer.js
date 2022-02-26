const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all customers
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from customer');
    console.log(result)
    res.status(StatusCodes.OK).json(result);
});

// add new customers
router.post('/',async (req, res, next) => {
    const newCustomer = req.body;
    console.log(newCustomer);
    const result = await db.query(`
        INSERT INTO customer (company_name, name, address)
        VALUES ('${newCustomer.companyName}', '${newCustomer.name}', '${newCustomer.address}');
    `);
    res.status(StatusCodes.OK).json(result);
});

module.exports = router