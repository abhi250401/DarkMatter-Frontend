const router = require('express').Router();
const User = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    const emailexist = await User.findOne({
        email: req.body.formData.email
    }).catch(error => {
        console.log(error)
    });

    if (emailexist) res.json({ status: 'error', error: 'This email id already exists' })

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.formData.password, salt);

    try {
        const user = new User({
            name: req.body.formData.firstName,
            email: req.body.formData.email,
            phone: req.body.formData.phone,
            aadhar: req.body.formData.aadhar,
            aadhaar: req.body.formData.aadhar,
            pan: req.body.formData.pan,
            dob: req.body.formData.dob,
            role: 3,
            verified: 0,
            status: 0,
            password: hashPassword
        });

        const savedUser = await user.save();
        res.json({ status: 'success', data: savedUser })
    }
    catch (err) {
        res.json({ status: 'error', error: 'failed login' })
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        phone: req.body.phone,
    }).catch(error => {
        return res.json({ status: 'error', error: 'Invalid login' })
        console.log(error)
    });

    if (!user) {
        return { status: 'error', error: 'Invalid login' }
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.json({ status: 'error', user: false })

    console.log(user);

    //  Create a token and assign it
    const token = jwt.sign({
        _id: user._id,
        userID: user._id,
        avatar: null,
        role: user.role || 0,
        status: user.status || 0,
        name: user.name || '',
    }, 'hisdi', {
        expiresIn: '30d'
    });
    return res.json({ status: 'success', user: token })
})
router.post('/user/wishlist', async (req, res) => {

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

router.post('/phoneauth', async (req, res) => {
    const user = await User.findOne({
        phone: req.body.phone_number
    })
        .catch(error => {
            console.log(error)
            return res.json({ status: 'error' })
        });

    if (!user) {
        return res.json({ status: 'error' })
    } else {
        return res.json({ status: 'success' });
    }
})

router.get('/users', async (req, res) => {
    await User.find().then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
})

router.get('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'hisdi')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'success', quote: user.quote })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

module.exports = router;