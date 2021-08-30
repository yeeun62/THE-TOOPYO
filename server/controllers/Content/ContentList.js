const { content, user, agree, disagree, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');

module.exports = {
    // 모든 게시물 보기입니다.
    allContent: async (req, res) => {
        try {
            let contentList = await sequelize.query(
                `
                SELECT contents.id, contents.userId, contents.title, contents.picture_1, contents.picture_2, contents.description, contents.voting_deadline, 
                users.nickName, users.profile_img,IFNULL(count2, 0) as agree, IFNULL(count1, 0) as disagree 
                FROM contents
                LEFT JOIN users ON contents.userId = users.id
                LEFT JOIN (SELECT contentId, COUNT(*) as count2 FROM agrees GROUP BY contentId) as agree_count on contents.id = agree_count.contentId
                LEFT JOIN (SELECT contentId, COUNT(*) as count1 FROM disagrees GROUP BY contentId) as disagree_count on contents.id = disagree_count.contentId
                `,
                { type: QueryTypes.SELECT },
            );
            res.status(200).json({ message: 'ok', content: contentList });
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
    // 특정 게시물 보기입니다.
    detailContent: async (req, res) => {
        try {
            const { id } = req.params;
            const { email } = req.body; //! session
            // if (email !== undefined) {
            let deTailContent = await sequelize.query(
                `
                    SELECT contents.userId, contents.title, contents.picture_1, contents.picture_2, contents.description,contents.voting_deadline, users.nickName, users.profile_img, COUNT(agrees.userId) AS agree,  COUNT(disagrees.userId) AS disagree FROM contents
                    LEFT JOIN agrees ON contents.id = agrees.contentId
                    LEFT JOIN disagrees ON disagrees.contentId = contents.id
                    JOIN users ON contents.userId = users.id
                    WHERE contents.id = ${id};
                    `,
                { type: QueryTypes.SELECT },
            );
            // const findUser = await user.findOne({ where: { email } });
            // const checkAgree = await agree.findOne({ where: { userId: findUser.id, contentId: id } });
            // const checkDisAgree = await disagree.findOne({ where: { userId: findUser.id, contentId: id } });
            // if (checkAgree) {
            //     deTailContent[0].checkAgree = true;
            // } else {
            //     deTailContent[0].checkAgree = false;
            // }
            // if (checkDisAgree) {
            //     deTailContent[0].checkDisAgree = true;
            // } else {
            //     deTailContent[0].checkDisAgree = false;
            // }
            res.status(200).json({ message: 'ok', data: deTailContent[0] });
            //}
            //else {
            // res.status(404).json({
            //     message: 'Content Not Found',
            // });
            //}
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 생성입니다.
    createContent: async (req, res) => {
        try {
            const { title, picture_1, picture_2, description, voting_deadline } = req.body;
            const findUser = await user.findOne({ where: { email: req.session.email } }); //! 나중에 session으로 바꿔야함
            if (title && picture_1 && picture_2 && description && voting_deadline) {
                const createContent = await content.create({
                    userId: findUser.dataValues.id,
                    title,
                    picture_1,
                    picture_2,
                    description,
                    voting_deadline,
                });
                console.log(createContent);
                res.status(201).json({ message: 'ok', contentId: createContent.id });
            } else {
                res.status(400).json({ message: 'please, rewrite' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 수정입니다.
    retouchContent: async (req, res) => {
        try {
            const findUser = await user.findOne({ where: { email: req.session.email } }); //! 나중에 req.session.emaiil로 변경해야함
            const findContent = await content.findOne({ where: { id: req.params.id } });
            const { title, picture_1, picture_2, description } = req.body;
            if (findUser.id !== findContent.userId) {
                return res.status(401).json({ message: 'not authorization' });
            }
            if (title && picture_1 && picture_2 && description) {
                await content.update({ title, picture_1, picture_2, description }, { where: { id: req.params.id } });
                res.status(200).json({ message: 'content update success' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 삭제입니다.
    deleteContent: async (req, res) => {
        try {
            const findUser = await user.findOne({ where: { email: req.session.email } }); //! 나중에 req.session.emaiil로 변경해야함
            const findContent = await content.findOne({ where: { id: req.params.id } });
            const contentUserId = findContent.userId;
            if (!findUser) {
                res.status(401).json({ message: 'not user session' });
            } else if (findUser.id !== contentUserId) {
                res.status(400).json({ message: 'not authorization' });
            } else if (findUser.id === contentUserId) {
                content.destroy({ where: { id: findContent.id } });
                res.status(200).json({ message: 'delete complete' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
};
