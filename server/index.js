require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const controllers = require('./controllers');

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: 'https://', //! 도메인 url 적어야함.
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);

app.post('/login', controllers.Login);
app.get('/signout', controllers.Signout);
app.post('/signup', controllers.Signup);
app.get('/content', controllers.content);

app.get('/movies/:id');

app.listen(port, () => {
    console.log('server listen on 4000');
});

module.exports = app;
