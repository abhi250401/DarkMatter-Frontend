const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./model/users');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const Stocks = require('./model/stocks');
const wishlist = require('./routes/wishlist');
const stock = require('./routes/stock');
//connect to db
app.use(cors());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhi:123456asdf@cluster0.05abf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    () => console.log('connected to db'));
//MIddleware
app.use(express.json());


//routemiddlewares 
app.use('/api/user', authRoute);
app.use('/api/user', wishlist);

app.use('/api', stock);
app.use('/api/posts', postRoute);

app.delete('/api/user/:id', function (req, res) {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.warn(err);
    })
});
app.put('/api/user/:id', function (req, res) {
    User.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, email: req.body.email } }).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        console.warn(err);
    })
})


app.delete('/api/stock/:id', function (req, res) {
    Stocks.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.warn(err);
    })
});
app.put('/api/stock/:id', function (req, res) {
    Stocks.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, price: req.body.price } }).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        console.warn(err);
    })
})


app.get('/api/userone/:id', (req, res) => {
    User.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});

app.get('/api/stockone/:id', (req, res) => {
    Stocks.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});



app.listen(process.env.PORT || 3000, () => console.log('server up and running'))