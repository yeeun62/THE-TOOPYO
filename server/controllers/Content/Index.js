const express = require('express');
const content = express();
const { allContent, detailContent, createContent, retouchContent, deleteContent } = require('./ContentList');
const { close } = require('./ContentClose');
const { agree, disagree } = require('./ContentChoice');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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
    // limits: { fileSize: 5 * 300 * 300 },
});

content.get('/', allContent);
content.get('/:id', detailContent);
content.post('/', createContent);
content.patch('/:id', upload.array('file', 2), retouchContent);
content.delete('/:id', deleteContent);

content.patch('/deadline/:id', close);

content.get('/agree/:id', agree);
content.get('/disagree/:id', disagree);

module.exports = content;
