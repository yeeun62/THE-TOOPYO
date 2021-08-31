const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { user } = require('./models');

const router = express.Router();

fs.readdir('upload', (error) => {
    // upload 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('upload');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'upload/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 300 * 300 },
});
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.patch('/uploads', upload.array('file', 2), async (req, res) => {
    console.log(req);
    const { filename } = req.files;
    if (filename) {
        await user.update(
            //
            { picture_1: files[0].path, picture_2: files[1].path },
            {
                where: {
                    picture_1: files[0].originalname,
                },
            },
        );
        res.status(200).json({ url1: `/upload/${req.files[0].filename}`, url2: `/upload/${req.files[1].filename}` }); //포스트맨으로 실험 불가능(파일)
    }
});

module.exports = router;
