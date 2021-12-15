const router = require('express').Router();
const Wishlist = require('../model/wishlist');
const jwt = require('jsonwebtoken');

// https://mongoosejs.com/docs/populate.html
router.post('/wishlist', async (req, res) => {

    const checkList = {
        stockId: req.body.stockId,
        userId: req.body.userId,
        user: req.body.userId,
        stock: req.body.stockId,
        listId: req.body.listId,
        stockName: req.body.stockName,
        stockCode: req.body.code
    };

    const stockAdded = await Wishlist.findOne(checkList).catch(error => { console.log(error) });
    if (stockAdded)
        res.json({ status: 'error', error: 'This stock id already exists' })
    if (!stockAdded) {
        try {
            const wishList = new Wishlist(checkList);
            const savedWishlist = await wishList.save();
            res.json({ status: 'success', data: savedWishlist })
        } catch (err) {
            res.json({ status: 'error', error: err })
        }
    }
});

router.get('/wishlist', async (req, res) => {
    const authorizationHeader = { authHeader } = req.get("Authorization");
    console.log(authorizationHeader)
    const verified = jwt.verify(authorizationHeader, "hisdi");

    await Wishlist.find({
        listId: req.query.listId,
        userId: verified._id,
    }).populate('stockId')
        .then((data) => {
            res.json({ status: 'success', data: data });
        }).catch(err => {
            res.json({ status: 'error', error: err });
        })
});
router.get('/wishlist/:code', async (req, res) => {
    await Wishlist.findOne({
        code: req.params.code
    }).populate('stock')
        .then((data) => {
            res.json({ status: 'success', data: data });
        }).catch(err => {
            res.json({ status: 'error', error: err });
        })
});

router.delete('/wishlist/:id', async (req, res) => {
    Wishlist.deleteOne({ _id: req.params.id, userId: req.body.userId }).then((result) => {
        res.json({ status: 'success', data: result });
    }).catch((err) => {
        res.json({ status: 'error', error: err });
    })
})
module.exports = router;