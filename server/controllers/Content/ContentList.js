const { content, user, agree, disagree, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
                ORDER BY contents.id DESC
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
            const id = req.params.id;
            const accessToken = req.cookies.accessToken;

            if (!accessToken) {
                res.status(404).json({ message: 'invalid access token' });
            } else {
                const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
                const userId = userInfo.id;

                let deTailContent = await sequelize.query(
                    `
                        SELECT contents.id, contents.userId, contents.title, contents.picture_1, contents.picture_2, contents.description,contents.voting_deadline, users.nickName, users.profile_img, COUNT(agrees.userId) AS agree,  COUNT(disagrees.userId) AS disagree FROM contents
                        LEFT JOIN agrees ON contents.id = agrees.contentId
                        LEFT JOIN disagrees ON disagrees.contentId = contents.id
                        JOIN users ON contents.userId = users.id
                        WHERE contents.id = ${id};
                        `,
                    { type: QueryTypes.SELECT },
                );

                const checkAgree = await agree.findOne({ where: { userId, contentId: id } });
                const checkDisAgree = await disagree.findOne({ where: { userId, contentId: id } });
                if (checkAgree) {
                    deTailContent[0].checkAgree = true;
                } else {
                    deTailContent[0].checkAgree = false;
                }
                if (checkDisAgree) {
                    deTailContent[0].checkDisAgree = true;
                } else {
                    deTailContent[0].checkDisAgree = false;
                }
                res.status(200).json({ message: 'ok', data: deTailContent[0] });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 생성입니다.
    createContent: async (req, res) => {
        const accessToken = req.cookies.accessToken;
        const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const { title, description, voting_deadline, picture_1, picture_2 } = req.body;
        if (title && description && voting_deadline) {
            try {
                const createContent = await content.create({
                    userId: userInfo.id,
                    title,
                    description,
                    voting_deadline,
                    picture_1,
                    picture_2,
                });
                res.status(201).json({ message: 'ok', contentId: createContent.id });
            } catch (err) {
                res.status(500).json({ message: 'server error' });
            }
        } else {
            res.status(400).json({ message: 'please, rewrite' });
        }
    },

    // 게시물 수정입니다.
    retouchContent: async (req, res) => {
        try {
            const id = req.params.id;
            const accessToken = req.cookies.accessToken;
            const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            const findContent = await content.findOne({ where: { id } });
            const { title, picture_1, picture_2, description } = req.body;
            if (userInfo.id !== findContent.userId) {
                return res.status(401).json({ message: 'not authorization' });
            }
            if (title && picture_1 && picture_2 && description) {
                await content.update({ title, picture_1, picture_2, description }, { where: { id } });
                res.status(200).json({ message: 'content update success' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },

    // 게시물 삭제입니다.
    deleteContent: async (req, res) => {
        try {
            const id = req.params.id;
            const accessToken = req.cookies.accessToken;
            const userInfo = await jwt.verify(accessToken, process.env.ACCESS_SECRET);
            const findContent = await content.findOne({ where: { id } });
            const contentUserId = findContent.userId;
            if (!userInfo) {
                res.status(401).json({ message: 'not authorization' });
            } else if (userInfo.id !== contentUserId) {
                res.status(400).json({ message: 'not authorization' });
            } else if (userInfo.id === contentUserId) {
                content.destroy({ where: { id: findContent.id } });
                res.status(200).json({ message: 'delete complete' });
            }
        } catch (err) {
            res.status(500).json({ message: 'server error' });
        }
    },
};
