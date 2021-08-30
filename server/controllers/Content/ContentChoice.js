const { user } = require('../../models');
const { agree } = require('../../models');
const { disagree } = require('../../models');

module.exports = {
    // 찬성버튼을 눌렀을때 입니다.
    agree: async (req, res) => {
        try {
            const findUser = await user.findOne({ where: { email: req.body.session } }); //! session
            if (findUser) {
                // 반대한 기록이 있는지 확인
                const checkDisagree = await disagree.findOne({
                    where: { userId: findUser.id, contentId: req.params.id },
                });
                // 반대한 기록이 있다면 삭제
                if (checkDisagree) {
                    await disagree.destroy({ where: { userId: findUser.id, contentId: req.params.id } });
                }
                // 찬성한 기록이 있는지 확인
                const checkAgree = await agree.findOne({ where: { userId: findUser.id, contentId: req.params.id } });
                // 찬성한 기록이 있다면 찬성기록 삭제
                if (checkAgree) {
                    await agree.destroy({ where: { userId: findUser.id, contentId: req.params.id } });
                    res.status(200).json({ message: 'cancel agress' });
                    // 찬성한 기록이 없다면 찬성 추가
                } else {
                    await agree.create({ userId: findUser.id, contentId: req.params.id });
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
            const findUser = await user.findOne({ where: { email: req.body.session } }); //! session
            if (findUser) {
                const checkAgree = await agree.findOne({
                    where: { userId: findUser.id, contentId: req.params.id },
                });
                if (checkAgree) {
                    await agree.destroy({ where: { userId: findUser.id, contentId: req.params.id } });
                }
                const checkDisagree = await disagree.findOne({
                    where: { userId: findUser.id, contentId: req.params.id },
                });
                if (checkDisagree) {
                    await disagree.destroy({ where: { userId: findUser.id, contentId: req.params.id } });
                    res.status(200).json({ message: 'cancel disagress' });
                } else {
                    await disagree.create({ userId: findUser.id, contentId: req.params.id });
                    res.status(200).json({ message: 'disagree complete' });
                }
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
};
