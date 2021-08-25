const express = require('express');
const user = express();
const { mypage, retouchMypage } = require('./UserInfo');

user.get('/', mypage);
user.patch('/:id', retouchMypage);

module.exports = user;
