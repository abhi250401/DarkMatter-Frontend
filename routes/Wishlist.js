const router = require('express').Router();
const Wishlist = require('../model/Wishlist');


router.post('/wishlist', async (req, res) => {

    const stockExist = await Wishlist.findOne({
        stock_id: req.body.stock_id
    }).catch(error => { console.log(error) });

    if (stockExist) res.json({ status: 'error', error: 'Duplicate Stock' })
    try {
        const wishList = new Wishlist({
            stock_id: req.body.stock_id,
            user_id: req.body.user_id,
            listId: req.body.listId,
        });
        const savedWishlist = await wishList.save();
        res.json({ status: 'ok' })
    }
    catch (err) {
        res.json({ status: 'error', error: 'failed' })
    }


});
router.get('/wishlist', async (req, res) => {
    Wishlist.find().then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});


router.get('/wishlist/:id', async (req, res) => {
    Wishlist.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});


router.delete('/wishlist/:id', async (req, res) => {
    Wishlist.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.warn(err);
    })
})
module.exports = router;