const { content } = require('../../models');
const { user } = require('../../models');

module.exports = {
    // 투표종료입니다.
    close: async (req, res) => {
        try {
            const findUser = await user.findOne({ where: { email: req.body.session } }); //! 나중에 req.session.emaiil로 변경해야함
            const findContent = await content.findOne({ where: { id: req.params.id } });
            if (!findUser) {
                res.status(400).json({ message: 'not user session' });
            } else if (findUser.id === findContent.userId) {
                content.update({ voting_deadline: 'true' }, { where: { id: req.params.id } });
                res.status(200).json({ message: '투표가 종료되었습니다' });
            } else {
                res.status(401).json({ message: 'not authorization' });
            }
        } catch (err) {
            console.log(new Error(err));
        }
    },
};
