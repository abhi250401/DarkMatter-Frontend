const router = require('express').Router();
const Holdings = require('../model/holdings');
const jwt = require('jsonwebtoken');

router.post('/holdings', async (req, res) => {
    const authorizationHeader = { authHeader } = req.get("Authorization");
    const verified = jwt.verify(authorizationHeader, "hisdi");

    const holdings = new Holdings({
        userId: verified._id,
        //  stockId: req.body.stockId,
        quantity: req.body.quantity,
        datetime: req.body.datetime,
        price: req.body.price,
        stockCode: req.body.stockCode
    })
    const result = await holdings.save();
    res.json(result);
});
router.get('/holdings', async (req, res) => {
    const authorizationHeader = { authHeader } = req.get("Authorization");
    const verified = jwt.verify(authorizationHeader, "hisdi");

    const userExist = await Holdings.find({ userId: verified._id }).then((resp) => {
        res.json(resp);
    }).catch(() => {
        res.json('user not found')
    })
})

module.exports = router;