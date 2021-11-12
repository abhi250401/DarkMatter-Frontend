const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {

    const emailexist = await User.findOne({
        email: req.body.email
    }).catch(error => { console.log(error) });
    if (emailexist) res.json({ status: 'error', error: 'Duplicate email' })






    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: '',
            role: 3,
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
        email: req.body.email
    }).catch(error => {
        console.log(error)
    });

    if (!user) {
        return { status: 'error', error: 'Invalid login' }
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.json({ status: 'error', user: false })

    //create a token and assign it
    const token = jwt.sign({ _id: user._id }, "hisdi");
    return res.json({ status: 'ok', user: token })


})


module.exports = router;