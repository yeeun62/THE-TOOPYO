require('dotenv').config();
const cors = require('cors');
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

app.get('/user', controllers.userInfo.mypage);
app.patch('/user/:id', controllers.userInfo.retouchMypage);

app.get('/content', controllers.content.allContent);
app.get('/content/:id', controllers.content.detailContent);
app.post('/content', controllers.content.createContent);
app.patch('/content/:id', controllers.content.retouchContent);
app.delete('/content/:id', controllers.content.deleteContent);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => {
    console.log('server listen on 4000');
});

module.exports = app;
