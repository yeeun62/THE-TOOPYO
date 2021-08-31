const express = require('express');
const user = express();
const { mypage, retouchMypage } = require('./UserInfo');

user.post('/', mypage);
user.patch('/', retouchMypage);

module.exports = user;
