const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const postsRoute = require('./routers/posts');

app.use('/posts', postsRoute);

app.get('/',(req,res) => {
    res.send('we are on home');
});

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },() => 
    console.log('connnect to DB!')
);

app.listen(3000);