const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { content } = require('./models');

const router = express.Router();

fs.readdir('upload', (error) => {
    if (error) {
        fs.mkdirSync('upload');
    }
});

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, '../client/public/upload');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
});
router.patch('/uploads', upload.array('file', 2), async (req, res) => {
    try {
        await content.update(
            { picture_1: req.files[0].filename, picture_2: req.files[1].filename },
            {
                where: {
                    picture_1: req.files[0].originalname,
                },
            },
        );

        res.status(200).json({ url1: `/upload/${req.files[0].filename}`, url2: `/upload/${req.files[1].filename}` });
    } catch (err) {
        res.status(500).json({ message: 'ss' });
    }
});

module.exports = router;
