const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const holdings = require('./routes/holdings')
let multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Category = require('./model/Category');
//  Import models
const User = require('./model/users');
const Stocks = require('./model/stocks');

//  Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const stock = require('./routes/stocks');
const wishlist = require('./routes/wishlist');

//connect to db
app.use(cors());

const mongoose = require('mongoose');
const stocks = require('./model/stocks');

mongoose.connect('mongodb+srv://abhi:123456asdf@cluster0.05abf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    () => console.log('connected to db'));

//  Middleware
app.use(express.json());

const DIR = '../public/images';
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
app.put('/api/user/pan/:id', upload.single('panFile'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    User.updateOne({ _id: req.params.id },
        {
            $set:
                { panFile: url + '/public/' + req.file.filename }
        })
        .then((result) => {
            res.status(201).json({
                message: "User registered successfully!",
                userCreated: {
                    _id: result._id,
                    panFile: result.panFile
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
app.use('/api/user', holdings);

app.use('/api/user', wishlist);
app.use('/api', stock);
app.use('/api/posts', postRoute);
app.post('/api/stock/category', function (req, res) {
    const category = new Category({
        title: req.body.title,
        code: req.body.code
    })
    const result = category.save();
    if (result)
        res.json('success');
});
app.get('/api/stock/category', function (req, res) {
    if (req.query.code) {
        Category.find({ code: req.query.code }).then((response) => {
            res.json(response);
        }).catch((err) => {
            res.json(err);
        })
    }
    else {
        Category.find().then((response) => {
            res.json(response);
        }).catch((err) => {
            res.json(err);
        })
    }
});
app.delete('/api/user/:id', function (req, res) {
    User.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.warn(err);
    })
});

app.put('/api/user', function (req, res) {
    const authorizationHeader = authHeader = req.get("Authorization");
    const verifie = jwt.verify(authorizationHeader, "hisdi");

    if (req.body.params && req.body.params._id) {
        User.updateOne({ _id: req.body.params._id }, { $set: { name: req.body.body.name, email: req.body.body.email, phone: req.body.body.phone, role: req.body.body.role, verify: req.body.body.verify, aadhaar: req.body.body.aadhaar, pan: req.body.body.pan, dob: req.body.body.dob, status: req.body.body.status } }).then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            console.warn(err);
        })
    }
    else {
        console.log(req.body.body.dob)
        const id = req.body.body.idname

        User.updateOne({ _id: verifie._id }, { $set: { name: req.body.body.name, email: req.body.body.email, phone: req.body.body.phone, role: req.body.body.role, verify: req.body.body.verify, idname: req.body.body.idname, id: req.body.body.idSelect, pan: req.body.body.pan, dob: req.body.body.dob, status: req.body.body.status } }).then((result) => {
            res.status(201).json(result);
        }).catch((err) => {
            console.warn(err);
        })
    }
});


/*app.put('/api/user/wishlist/:id/:listId/:code', function (req, res) {
    User.updateOne({ _id: req.params.id }, { $set: { lists:{ req.params.listId : [ req.params.code ]} } }).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        console.warn(err);
    })
})*/

app.delete('/api/stock/:id', function (req, res) {
    Stocks.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.warn(err);
    })
});

app.put('/api/stock/:id', function (req, res) {
    const authorizationHeader = authHeader = req.get("Authorization");


    Stocks.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, price: req.body.price } }).then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        console.warn(err);
    })
})

app.get('/api/userone', (req, res) => {
    const authorizationHeader = authHeader = req.get("Authorization");
    const verified = jwt.verify(authorizationHeader, "hisdi");
    if (req.query._id) {
        User.findById(req.query._id).then((data) => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    }
    else {
        User.findById(verified._id).then((data) => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
    }
});

app.get('/api/user/stock/:code', (req, res) => {
    //user auth 
    const authorizationHeader = { authHeader } = req.get("Authorization");
    const verified = jwt.verify(authorizationHeader, "hisdi");
    //user auth
    Stocks.findOne({ code: req.params.code }).then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
});


app.listen(process.env.PORT || 3000, () => console.log('server up and running'))