const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { user } = require('./models');

const router = express.Router();

// fs.readdir('upload', (error) => {
//     // upload 폴더 없으면 생성
//     if (error) {
//         fs.mkdirSync('upload');
//     }
// });

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, '../client/public/upload');
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1000 * 1000 },
});
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.patch('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log('file', req.file);
        const { originalname } = req.file;
        const filepath = req.file.path;
        // console.log('filename', filename);
        console.log(originalname, filepath);
        if (originalname && filepath) {
            await user.update(
                { profile_img: originalname },
                {
                    where: {
                        profile_img: originalname, //토큰의 아이디로
                    },
                },
            );
            res.status(200).send('ee');
            //포스트맨으로 실험 불가능(파일)
        } else {
            res.status(400).send('업로드 문제');
        }
    } catch (err) {
        res.status(500).send('업로드500');
    }
});

module.exports = router;
