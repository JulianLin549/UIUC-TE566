const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');


// get invoice history
router.get('/',async (req, res, next) => {
    try {
        const result = await db.query(`SELECT invoice.*, company_name, name, address
                                            FROM invoice INNER JOIN customer
                                            ON customer.customer_id::varchar = invoice.customer_id`
        );
        console.log(result)
        res.status(StatusCodes.OK).json(result);
    } catch (e){
        console.log(e)
    }
});


router.post('/',async (req, res, next) => {
    try{
        const invoice = req.body;
        console.log(invoice);

        const complete_product = await db.one('select * from inventory where id = 1');
        const prod_quantity = complete_product.quantity;
        if (parseInt(invoice.quantity) > parseInt(prod_quantity)){
            return res.status(StatusCodes.OK).json({error: "Not having enough product in Inventory"});
        }

        await db.tx(async t => {
            const value = parseFloat(invoice.value);
            await db.none(`
                INSERT INTO invoice (customer_id, quantity, unit_price, value, settlement) VALUES ($1, $2, $3, $4, $5)`,
                        [invoice.customerId, invoice.quantity, invoice.unitPrice, value, false]);

            const bs = await db.one('select * from balance_sheet where bs_id = 1');
            const complete_product = await db.one('select * from inventory where id = 1');
            const prod_quantity = complete_product.quantity;
            const new_prod_quantity = parseInt(prod_quantity) - parseInt(invoice.quantity);
            const new_prod_value = parseFloat(complete_product.unit_price) * new_prod_quantity;
            await t.none('UPDATE inventory SET quantity = $1, value = $2 WHERE id = 1', [new_prod_quantity, new_prod_value]);
            await t.none('UPDATE balance_sheet SET receivable = $1 WHERE bs_id = 1', [parseFloat(bs.receivable) + parseFloat(value)]);

        })

        res.status(StatusCodes.OK).json();
    } catch(e) {
        console.log(e)
    }

});

module.exports = router