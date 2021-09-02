const { content } = require('../../models');
const { user } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    close: async (req, res) => {
        try {
            const id = req.params.id;
            const accessToken = req.cookies.accessToken;
            const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);

            const findContent = await content.findOne({ where: { id } });
            if (!userInfo) {
                res.status(400).json({ message: 'not authorization' });
            } else if (userInfo.id === findContent.userId) {
                content.update({ voting_deadline: 'true' }, { where: { id } });
                res.status(200).json({ message: '투표가 종료되었습니다' });
            } else {
                res.status(401).json({ message: 'not authorization' });
            }
        } catch (err) {}
    },
};
