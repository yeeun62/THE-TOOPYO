const { user } = require('../../models');
const { content } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    // 내정보 입니다.
    mypage: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        try {
            if (!accessToken) {
                res.status(404).json({ message: 'invalid access token' });
            } else {
                const userData = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                delete userData.iat;
                delete userData.exp;
                const findcontent = await content.findAll({ where: { userId: userData.id } });
                res.status(200).json({ message: 'ok', data: { userInfo: userData, content: findcontent } });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
    // 내정보 수정입니다.
    retouchMypage: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        const { nickName, phoneNumber, password, profile_img, email } = req.body;
        if (!accessToken) {
            res.status(404).json({ message: 'invalid access token' });
        } else {
            const userData = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            try {
                await user.update(
                    { nickName, phoneNumber, password, email, profile_img },
                    { where: { id: userData.id } },
                ); //, profile_img
            } catch (err) {
                res.status(500).json({ message: 'server error' });
            }
            const newData = { id: userData.id, nickName, phoneNumber, email, profile_img };
            //profile_img;
            const newAccessToken = await jwt.sign(newData, process.env.ACCESS_SECRET);
            delete newAccessToken.iat;
            delete newAccessToken.exp;
            res.cookie('accessToken', newAccessToken).status(200).json({ message: 'ok' });
        }
    },
};
