// settlement
// after 30 days receivable -> cash, payable -> -cash
// 手動settlement
// TODO

const express = require('express'),
    router = express.Router(),
    { StatusCodes } = require('http-status-codes');

//settlement
router.get('/',async (req, res, next) => {

    res.status(StatusCodes.OK).json();
});
module.exports = router