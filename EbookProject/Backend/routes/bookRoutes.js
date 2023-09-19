const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
const multer = require('multer');

const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/sabri/Desktop/EbookProject/Frontend/public/pdfFile');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const pdfUpload = multer({ storage: pdfStorage });

const photoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/sabri/Desktop/EbookProject/Frontend/public/bookPhoto');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const photoUpload = multer({ storage: photoStorage });

router.get('/books', bookController.getAllBooks);
router.post('/addBook', bookController.addBook);
router.put('/updateBook/:id', bookController.updateBook);
router.delete('/deleteBook/:id', bookController.deleteBook);
router.get('/onebook/:id', bookController.getBook);
router.get('/search/:keyword', bookController.searchBooksByKeyword);

router.post('/pdfFile', pdfUpload.single('pdf'), (req, res) => {
const file = req.file;
if (!file) {    return res.status(400).send('No file uploaded.');}
const pdfUrl = `/pdfFile/${file.filename}`;
res.send({ pdfUrl });
});

router.post('/photoFile', photoUpload.single('photo'), (req, res) => {
const file = req.file;
if (!file) {    return res.status(400).send('No photo uploaded.');}
const photoUrl = `/bookPhoto/${file.filename}`;
res.send({ photoUrl });
});

module.exports = router;
