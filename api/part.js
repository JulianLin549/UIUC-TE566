const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all parts
router.get('/',async (req, res, next) => {
    const result = await db.any(`SELECT * FROM part INNER JOIN vendor
                                       ON vendor.vendor_id::varchar = part.vendor_id;`);

    res.status(StatusCodes.OK).json(result);
});

router.post('/',async (req, res, next) => {
    const newPart = req.body;
    console.log(newPart);
    const result = await db.none(`
        INSERT INTO part (vendor_id, part_name, unit_price) VALUES ($1, $2, $3)`,
        [newPart.vendorId, newPart.partName, newPart.unitPrice]);

    res.status(StatusCodes.OK).json(result);
});

module.exports = router