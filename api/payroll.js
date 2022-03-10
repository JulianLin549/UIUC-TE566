const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes'),
    db = require('../db/connectDB');

// get all payroll history
router.get('/',async (req, res, next) => {
    try{
        const result = await db.any(`SELECT * FROM payroll INNER JOIN employee
                                            ON employee.employee_id::varchar = payroll.employee_id;`);
        console.log(result);
        res.status(StatusCodes.OK).json(result);
    } catch(e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
        console.log(e)
    }
});

// pay employee
router.post('/',async (req, res, next) => {
    try{
        const payroll = req.body;

        await db.tx(async t => {
            await t.none(`INSERT INTO payroll (employee_id, amount) VALUES ($1, $2)`,[payroll.employeeId, payroll.amount]);
            const bs = await db.one('select * from balance_sheet where bs_id = 1');
            const new_bs_cash = parseFloat(bs.cash) - parseFloat(payroll.amount);
            await t.none('UPDATE balance_sheet SET cash = $1 WHERE bs_id = 1', [new_bs_cash]);

            const is = await db.one('select * from income_statement where is_id = 1');
            const new_is_payroll = parseFloat(is.payroll) + parseFloat(payroll.amount);
            await t.none('UPDATE income_statement SET payroll = $1 WHERE is_id = 1', [new_is_payroll]);
        })

        res.status(StatusCodes.OK).json();
    } catch(e) {
        console.log(e)
    }
});



module.exports = router