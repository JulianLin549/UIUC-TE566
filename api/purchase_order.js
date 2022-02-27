// balance payable will go up

const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');

// get all purchase order history
router.get('/',async (req, res, next) => {
    try{
        const result = await db.query('select * from purchase_order');
        res.status(StatusCodes.OK).json(result);
    } catch (e){
        console.log(e)
    }
});

router.post('/',async (req, res, next) => {
    try{
        // part name,
        const newPO = req.body;
        console.log(newPO);
        // if item not in inventory, then add, else change quantity
        const inventory_res = await db.query('select * from inventory where item_id = $1', [newPO.partId]);
        if (inventory_res.length === 0){
            return res.status(StatusCodes.OK).json({
                error: "Item not found in inventory, please add manually"
            });
        }

        await db.tx(async t => {
            await t.none(`INSERT INTO purchase_order (item_id, vendor_id, quantity, unit_price, value, settlement) VALUES ($1, $2, $3, $4, $5, $6)`,
                [newPO.partId, inventory_res[0].vendor_id, newPO.quantity, newPO.unitPrice, newPO.value, false]);
            const new_inv_quantity = parseInt(inventory_res[0].quantity) + parseInt(newPO.quantity);

            const new_inv_value = parseFloat(inventory_res[0].value) + parseFloat(newPO.value);
            const bs = await db.one('select * from balance_sheet where bs_id = 1');
            await t.none('UPDATE inventory SET quantity = $1, value = $2 WHERE item_id = $3', [new_inv_quantity, new_inv_value, inventory_res[0].item_id]);
            await t.none('UPDATE balance_sheet SET payable = $1 WHERE bs_id = 1', [parseFloat(bs.payable) + parseFloat(newPO.value)]);

        })


        return res.status(StatusCodes.OK).json();
    } catch (e){
        console.log(e)
    }
});

router.post('/new',async (req, res, next) => {
    try{
        // part name, vendor id, quantity, unit price
        const newPO = req.body;
        const po_value = parseFloat(newPO.unitPrice) * parseFloat(newPO.quantity);
        await db.tx(async t => {
            await t.query( `INSERT INTO inventory (part_name, vendor_id, unit_price, quantity, value) VALUES ($1, $2, $3, $4, $5)`,
        [newPO.partName, newPO.vendorId, newPO.unitPrice, newPO.quantity, po_value]);
            const new_inv = await t.one('SELECT item_id FROM inventory ORDER BY created_at LIMIT 1');
            await t.none(`INSERT INTO purchase_order (item_id, vendor_id, quantity, unit_price, value, settlement) VALUES ($1, $2, $3, $4, $5, $6)`,
                [new_inv.item_id, newPO.vendorId, newPO.quantity, newPO.unitPrice, newPO.value, false]);

            const bs = await db.one('select * from balance_sheet where bs_id = 1');
            await t.none('UPDATE balance_sheet SET payable = $1 WHERE bs_id = 1', [parseFloat(bs.payable) + parseFloat(newPO.value)]);
        })
        res.status(StatusCodes.OK).json();
    } catch (e){
        console.log(e)
    }
});
module.exports = router