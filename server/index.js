require('dotenv').config();
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: true,
        //['http://localhost:3000', 'https://the-toopyo.com'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);
app.use(cookieParser());

app.post('/login', controllers.login);
app.get('/signout', controllers.signOut);
app.post('/signup', controllers.signUp);

app.use('/user', controllers.userInfo);

app.use('/content', controllers.content);

const PORT = 80;

const server = app.listen(PORT, () => {
    console.log('열려라 서버!');
});

module.exports = server;
