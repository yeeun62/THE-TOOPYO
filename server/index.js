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
        origin: ['https://'], //! 도메인 url 적어야함.
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);

app.use(cookieParser());
app.post('/login', controllers.login);
app.get('/signout', controllers.signout);
app.post('/signup', controllers.signup);

app.get('/content', controllers.content);
app.get('/content/:id', controllers.content);
app.post('/content', controllers.content);
app.patch('/content:id', controllers.content);
app.delete('/content:id', controllers.content);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.listen(HTTPS_PORT, () => {
    console.log('server listen on 4000');
});

module.exports = app;
