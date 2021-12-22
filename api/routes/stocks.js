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
                code: req.body.code,
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


router.get('/admin/stocks', async (req, res, next) => {
    let page = parseInt(req.query.page) || 0,
        limit = parseInt(req.query.rowsperpage) || 25,
        pageOffset = 0,
        query = {};
    console.log(req.params);
    if (page > 1) {
        pageOffset = (page - 1) * limit;
    } else {
        page = 1;
    }

    let response = { status: 'error', data: [], count: 0, page: page, pages: 1, total: 0, skip: pageOffset };

    //  Get total documents
    // response.total = await Stocks.find( query ).countDocuments();
    await Stocks.find(query).countDocuments()
        .then((total) => {
            response.total = total;
            response.pages = Math.ceil(total / limit);
            if (total) {
                response.status = 'success';
            }
        });

    //  Get paginated documents
    await Stocks.find(query)
        .skip(pageOffset)
        .limit(limit)
        .then((data) => {
            response.data = data;
        }).catch(err => {
            response.error = err;
        }).finally(() => {
            response.count = response.data.length;
        });

    /*const agg = Stocks.aggregate([
        { $match: { public: true }, },
        { $group: { _id: null, total: { $sum: 1 } } },
    ]);

    for await (const doc of agg) {
        console.log(doc);
    }*/

    return res.status(200).json(response);
})

module.exports = router;