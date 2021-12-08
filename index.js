const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./model/users');
//import routes
const authRoute = require('./routes/auth');
let multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
app.put('/api/user/image/:id', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    User.updateOne({ _id: req.params.id },
        {
            $set:
                { profileImg: url + '/public/' + req.file.filename }
        })
        .then((result) => {
            res.status(201).json({
                message: "User registered successfully!",
                userCreated: {
                    _id: result._id,
                    profileImg: result.profileImg
                }
            })
        }).catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        })
})



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

app.get('/api/user/stock/:code', (req, res) => {
    Stocks.findOne({ code: req.params.code }).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});



app.listen(process.env.PORT || 3000, () => console.log('server up and running'))