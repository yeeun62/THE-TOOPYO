require('dotenv').config();
const cors = require('cors');
//const https = require('https');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ['https://the-toopyo.com'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);

app.use(cookieParser());

app.post('/login', controllers.login);
app.get('/signout', controllers.signOut);
app.post('/signup', controllers.signUp);

app.all('/user', controllers.userInfo);

app.all('/content', controllers.content);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => {
    console.log('열려라 서버!');
});

module.exports = app;
