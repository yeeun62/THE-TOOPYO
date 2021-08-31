const { user } = require('../../models');
const { agree } = require('../../models');
const { disagree } = require('../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    // 찬성버튼을 눌렀을때 입니다.
    agree: async (req, res) => {
        try {
            const accessToken = req.cookies.accessToken;
            const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            if (userInfo) {
                // 반대한 기록이 있는지 확인
                const checkDisagree = await disagree.findOne({
                    where: { userId: userInfo.id, contentId: req.params.id },
                });
                // 반대한 기록이 있다면 삭제
                if (checkDisagree) {
                    await disagree.destroy({ where: { userId: userInfo.id, contentId: req.params.id } });
                }
                // 찬성한 기록이 있는지 확인
                const checkAgree = await agree.findOne({ where: { userId: userInfo.id, contentId: req.params.id } });
                // 찬성한 기록이 있다면 찬성기록 삭제
                if (checkAgree) {
                    await agree.destroy({ where: { userId: userInfo.id, contentId: req.params.id } });
                    res.status(200).json({ message: 'cancel agress' });
                    // 찬성한 기록이 없다면 찬성 추가
                } else {
                    await agree.create({ userId: userInfo.id, contentId: req.params.id });
                    res.status(200).json({ message: 'agree complete' });
                }
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 반대버튼을 눌렀을때 입니다.
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
