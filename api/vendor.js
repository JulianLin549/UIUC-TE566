const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all vendors
router.get('/',async (req, res, next) => {
    const result = await db.query('select * from vendor');
    res.status(StatusCodes.OK).json(result);
});

// add new vendor
router.post('/',async (req, res, next) => {
    const newVendor = req.body;
    console.log(newVendor);
    const result = await db.query(`
        INSERT INTO vendor (company_name, part, unit_price, address)
        VALUES ('${newVendor.companyName}', '${newVendor.part}', 
        '${newVendor.unitPrice}', '${newVendor.address}');
    `);
    res.status(StatusCodes.OK).json(result);
});

module.exports = router