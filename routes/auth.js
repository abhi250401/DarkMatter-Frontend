const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', async (req, res) => {

    const emailexist = await User.findOne({
        email: req.body.formData.email
    }).catch(error => { console.log(error) });
    if (emailexist) res.json({ status: 'error', error: 'Duplicate email' })






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
        res.json({ status: 'ok' })
    }
    catch (err) {
        res.json({ status: 'error', error: 'failed login' })
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        phone: req.body.phone
    }).catch(error => {
        return res.json({ status: 'error', error: 'Invalid login' })
        console.log(error)
    });

    if (!user) {
        return { status: 'error', error: 'Invalid login' }
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.json({ status: 'error', user: false })

    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    console.log(user);
    // var expiryDate = new Date(date.setMonth(date.getMonth() + 1));
    //create a token and assign it
    const token = jwt.sign({
        _id: user._id,
        userID: user._id,
        avatar: null,
        role: user.role,
        status: user.status,
        name: user.name,

        expiry: expiryDate
    },
        "hisdi");
    return res.json({ status: 'ok', user: token })


})

router.post('/phoneauth', async (req, res) => {
    const user = await User.findOne({
        phone: req.body.phone_number
    })
        .catch(error => {
            console.log(error)
            return res.json({ status: "invalid" })
        });


    if (!user) {
        return res.json({ status: "not ok" })
    }
    else
        return res.json({ status: "ok" });

})


router.get('/users', async (req, res) => {

    await User.find().then((data) => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    })
}
)


router.get('/quote', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'hisdi')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})



module.exports = router;