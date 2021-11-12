const express = require('express');
const app = express();
const cors = require('cors');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
//connect to db
app.use(cors());
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhi:123456asdf@cluster0.05abf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    () => console.log('connected to db'));
//MIddleware
app.use(express.json());


//routemiddlewares 
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.get('/', (req, res) => {
    res.send('we are at home page');
});
app.get('/', (req, res) => {
    res.send('we are at home page');
})

app.listen(3000, () => console.log('server up and running'))