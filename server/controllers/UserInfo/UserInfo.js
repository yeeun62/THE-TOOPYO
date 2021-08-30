const { user } = require('../../models');
const { content } = require('../../models');

module.exports = {
    // 내정보 입니다.
    mypage: async (req, res) => {
        const { email } = req.body;
        if (email !== undefined) {
            const findUser = await user.findOne({
                where: {
                    email,
                },
            });
            const { id } = findUser;
            const findcontent = await content.findAll({
                where: {
                    userId: id,
                },
            });
            res.status(200).json({
                message: 'ok',
                data: {
                    content: findcontent,
                    userInfo: findUser,
                },
            });
        } else {
            res.status(404).json({ message: 'Bad Request' });
        }
    },
    // 내정보 수정입니다.
    retouchMypage: async (req, res) => {
        //! 나중에 session으로 바꿔야함
        const { nickName, email, phoneNumber, profile_img } = req.body;
        const finduser = await user.findOne({
            where: {
                email: req.session.email,
            },
        });
        if (email === finduser.email) {
            const findNickname = await user.findOne({
                where: {
                    nickName,
                },
            });
            if (!findNickname) {
                await user.update(
                    {
                        nickName,
                        email,
                        phoneNumber,
                        profile_img,
                    },
                    {
                        where: {
                            email,
                        },
                    },
                );
                const userInfo = await user.findOne({
                    where: {
                        email,
                    },

                });
                res.status(200).json({
                    message: 'ok',
                    data: {
                        userInfo: userInfo,
                    },
                });
            } else {
                res.status(400).json({ message: 'Bad Request' });
            }
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    },
};
