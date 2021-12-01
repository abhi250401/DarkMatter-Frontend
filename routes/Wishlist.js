const router = require('express').Router();
const Wishlist = require('../model/wishlist');
// https://mongoosejs.com/docs/populate.html
router.post('/wishlist', async (req, res) => {
    const checkList = {
        stockId: req.body.stockId,
        userId: req.body.userId,
        listId: req.body.listId,
    };

    await Wishlist.findOne(checkList)
        .then(() => {
            res.json({ status: 'error', error: 'Stock already added to wishlist' })
        })
        .catch(error => { console.log(error) });

    try {
        const wishList = new Wishlist(checkList);
        const savedWishlist = await wishList.save();
        res.json({ status: 'success', data: savedWishlist })
    } catch (err) {
        res.json({ status: 'error', error: err })
    }
});

router.get('/wishlist/:id', async (req, res) => {
    Wishlist.find({
        userId: req.body.user_id,
        listId: req.params.id,
    })
        .then((data) => {
            res.json({ status: 'success', data: data });
        }).catch(err => {
            res.json({ status: 'error', error: err });
        })
});

router.delete('/wishlist/:id', async (req, res) => {
    Wishlist.deleteOne({ _id: req.params.id, userId: req.body.user_id }).then((result) => {
        res.json({ status: 'success', data: result });
    }).catch((err) => {
        res.json({ status: 'error', error: err });
    })
})
module.exports = router;