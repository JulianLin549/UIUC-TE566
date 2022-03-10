const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get all inventory
router.get('/',async (req, res, next) => {
    const result = await db.query(`select * from inventory inner join vendor 
                                          on vendor.vendor_id::varchar = inventory.vendor_id`);
    console.log(result)

    res.status(StatusCodes.OK).json(result);
});

// add new inventory
router.post('/',async (req, res, next) => {
    const newItem = req.body;
    console.log(newItem);
    const result = await db.none(`
        INSERT INTO inventory (part_name, part_id, vendor_id, unit_price, quantity, value) VALUES ($1, $2, $3, $4, $5)`,
        [newItem.partName, newItem.part_id, newItem.vendorId, newItem.unitPrice, newItem.quantity, newItem.unitPrice * newItem.quantity]);

    res.status(StatusCodes.OK).json(result);
});

module.exports = router