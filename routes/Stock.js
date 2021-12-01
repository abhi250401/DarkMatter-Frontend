const router = require('express').Router();
const Stocks = require('../model/stocks');

router.post('/stock', async (req, res) => {

    const stockExist = await Stocks.findOne({
        name: req.body.name
    }).catch(error => { console.log(error) });

    if (stockExist) res.json({ status: 'error', error: 'Duplicate Stock' })
    try {
        const stock = new Stocks({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            cateogary: req.body.cateogary,

        });
        const savedStock = await stock.save();
        res.json({ status: 'ok' })
    }
    catch (err) {
        res.json({ status: 'error', error: 'failed' })
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