const { user } = require('../../models');
const { agree } = require('../../models');
const { disagree } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    agree: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            if (userInfo) {
                const checkDisagree = await disagree.findOne({
                    where: { userId: userInfo.id, contentId: req.params.id },
                });
                if (checkDisagree) {
                    await disagree.destroy({ where: { userId: userInfo.id, contentId: req.params.id } });
                }
                const checkAgree = await agree.findOne({ where: { userId: userInfo.id, contentId: req.params.id } });
                if (checkAgree) {
                    await agree.destroy({ where: { userId: userInfo.id, contentId: req.params.id } });
                    res.status(200).json({ message: 'cancel agress' });
                } else {
                    await agree.create({ userId: userInfo.id, contentId: req.params.id });
                    res.status(200).json({ message: 'agree complete' });
                }
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    disagree: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            if (userInfo) {
                const checkAgree = await agree.findOne({
                    where: { userId: userInfo.id, contentId: req.params.id },
                });
                if (checkAgree) {
                    await agree.destroy({ where: { userId: userInfo.id, contentId: req.params.id } });
                }
                const checkDisagree = await disagree.findOne({
                    where: { userId: userInfo.id, contentId: req.params.id },
                });
                if (checkDisagree) {
                    await disagree.destroy({ where: { userId: userInfo.id, contentId: req.params.id } });
                    res.status(200).json({ message: 'cancel disagress' });
                } else {
                    await disagree.create({ userId: userInfo.id, contentId: req.params.id });
                    res.status(200).json({ message: 'disagree complete' });
                }
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
};
