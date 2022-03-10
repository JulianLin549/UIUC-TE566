
const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');

//settlement
router.get('/',async (req, res, next) => {
    try{
        await db.tx(async t => {
            const bs = await t.one('select * from balance_sheet where bs_id = 1');
            const is = await t.one('select * from income_statement where is_id = 1');

            //select from invoice which is more than one month and marked as un-settled
            const invoices = await t.query(`select * from invoice where settlement = false and created_at < (CURRENT_DATE - INTERVAL '25 days');`);
            console.log(invoices)
            const receivable_obj = await t.one(`select sum(value) from invoice where settlement = false and created_at < (CURRENT_DATE - INTERVAL '25 days');`);
            const receivable = !!receivable_obj.sum ? parseFloat(receivable_obj.sum) : 0;
            // mark as settled
            for (const invoice of invoices) {
                await t.none('UPDATE invoice SET settlement = $1 WHERE invoice_id = $2', [true, invoice.invoice_id]);
            }

            //select from PO which is more than one month and marked as un-settled
            const pos = await t.query(`select * from purchase_order where settlement = false and created_at < (CURRENT_DATE - INTERVAL '25 days');`);
            const payable_obj = await t.one(`select sum(value) from purchase_order where settlement = false and created_at < (CURRENT_DATE - INTERVAL '25 days');`);
            const payable = !!payable_obj.sum ? parseFloat(payable_obj.sum) : 0;

            // mark as settled
            for (const po of pos) {
                await t.none('UPDATE purchase_order SET settlement = $1 WHERE po_id = $2', [true, po.po_id]);
            }

            //from BS subtract payable and subtract cash, subtract receivable and add cash
            const new_bs_receivable = parseFloat(bs.receivable) - receivable;
            const new_bs_payable = parseFloat(bs.payable) - payable;
            const new_bs_cash = parseFloat(bs.cash) - payable + receivable;
            await t.none('UPDATE balance_sheet SET receivable = $1, payable = $2, cash = $3 WHERE bs_id = 1',
                [new_bs_receivable, new_bs_payable, new_bs_cash]);

            // from IS subtract cogs and add sales
            const new_is_sales = parseFloat(is.sales) + receivable;
            const new_is_cogs = parseFloat(is.cogs) + payable;
            await t.none('UPDATE income_statement SET sales = $1, cogs = $2 WHERE is_id = 1',
                [new_is_sales, new_is_cogs]);

        })
    } catch (e) {
        console.log(e)
    }

    res.status(StatusCodes.OK).json();
});
module.exports = router