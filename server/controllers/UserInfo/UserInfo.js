const { user } = require('../../models');
const { content } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    // 내정보 입니다.
    mypage: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;

            if (!accessToken) {
                res.status(404).json({ message: 'invalid access token' });
            } else {
                const userData = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                delete userData.iat;
                delete userData.exp;
                const findcontent = await content.findOne({ where: { userId: userData.id } });
                res.status(200).json({ message: 'ok', data: { userInfo: userData, content: findcontent } });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
    // 내정보 수정입니다.
    retouchMypage: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const { nickName, email, phoneNumber, profile_img } = req.body;

            if (!accessToken) {
                res.status(404).json({ message: 'invalid access token' });
            } else {
                const userData = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                await user.update({ nickName, email, phoneNumber, profile_img }, { where: { id: userData.id } });
                const newData = { id: userData.id, nickName, email, phoneNumber, profile_img };
                const newAccessToken = await jwt.sign(newData, process.env.ACCESS_SECRET);
                delete newAccessToken.iat;
                delete newAccessToken.exp;
                res.cookie('accessToken', newAccessToken).status(200).json({ message: 'ok' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
};
