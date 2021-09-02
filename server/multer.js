const express = require('express');
const multer = require('multer');
const { user } = require('./models');

const router = express.Router();

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
router.patch('/upload', upload.single('file'), async (req, res) => {
    try {
        const { originalname } = req.file;
        const filepath = req.file.path;
        if (originalname && filepath) {
            await user.update(
                { profile_img: originalname },
                {
                    where: {
                        profile_img: originalname,
                    },
                },
            );
            res.status(200).send('ee');
        } else {
            res.status(400).send('업로드 문제');
        }
    } catch (err) {
        res.status(500).send('업로드500');
    }
});

module.exports = router;
