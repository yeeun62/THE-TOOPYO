require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
// const https = require('https');
// const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const imgRouter = require('./multer');

const controllers = require('./controllers');
const { sequelize } = require('./models');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: true,
        // 'the-toopyo.com'
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);

//app.use(cookieParser());
app.use(
    session({
        secret: 'thetoopyo',
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: 'localhost',
            path: '/',
            maxAge: 24 * 6 * 60 * 10000,
            sameSite: 'none',
            httpOnly: true,
            secure: true,
        },
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: true,
        //['https://the-toopyo.com'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);

//app.use(cookieParser());
app.patch('/upload', imgRouter);
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
