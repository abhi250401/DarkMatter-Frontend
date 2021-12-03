const router = require('express').Router();
const Stocks = require('../model/stocks');

router.post('/stock', async (req, res) => {

    const stockExist = await Stocks.findOne({
        name: req.body.name
    }).catch(error => { console.log(error) });

    if (stockExist) res.json({ status: 'error', error: 'Duplicate Stock' })
    else {
        try {
            const stock = new Stocks({
                name: req.body.name,
                slug: req.body.slug,
                price: req.body.price,
                description: req.body.description,
                cateogary: req.body.cateogary,
            });
            const savedStock = await stock.save();
            res.json({ status: 'success' })
        }
        catch (err) {
            res.json({ status: 'error', error: 'failed' })
        }
    }
});

router.get('/admin/stocks', async (req, res) => {

    await Stocks.find().then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
}
)

module.exports = router;