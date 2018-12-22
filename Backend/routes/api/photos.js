const express = require('express');
const router = express.Router();
var multer = require('multer');
const path = require('path');
const fs = require('fs');

router.post('/uploadPhotos', function (req, res) {
    upload(req, res, function (err) {
        //console.log(req.body);
        //console.log(req.files);
        if (err) {
            console.log("Error in uploading file.")
            return res.end("Error uploading file.");
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        console.log("File uploaded successfully.")
        res.status(200).end("File is uploaded");
    });
});

router.post('/download/:file(*)', (req, res) => {
    console.log("inside download file");
    var file = req.params.file;
    var destinationDir = './public/uploads';
    var fileLocation = path.join(destinationDir, file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(base64img);
});

router.post('/downloadpdf/:file(*)', (req, res) => {
    console.log("inside download file");
    var file = req.params.file;
    var destinationDir = './public/uploads';
    var fileLocation = path.join(destinationDir, file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(base64img);
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
        //  addPhotosToDB(req.query.uid,file.originalname)
    }
});
var upload = multer({storage: storage}).any();


module.exports = router;