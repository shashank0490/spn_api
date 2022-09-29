const express = require('express');
const apiRoutes = express.Router();
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const upload = require('./index');

var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(`uploads`)) {
        fs.mkdirSync(`uploads`, 0766)
      }
      if (!fs.existsSync(`uploads/logs`)) {
        fs.mkdirSync(`uploads/logs`, 0766)
      }
      cb(null, "uploads/logs");
    },
    filename: function (req,file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
});
const multerUpload = multer({ storage: storage1});

// GET 
apiRoutes.get("/pages",upload.get.page);
apiRoutes.get("/languages",upload.get.language);
apiRoutes.get("/page-language-mapper/:_lng", upload.get.languageMapper);

// CREATE
apiRoutes.post("/pages",upload.post.page);
apiRoutes.post("/languages",upload.post.language);
apiRoutes.post("/page-language-mapper", upload.post.pageLanguageMapper);

// DOWNLOAD CSV
apiRoutes.get("/download/:_model",upload.get.download);
apiRoutes.get("/page-language-mapper/sample",upload.upload.sampleFormat);

// UPLOAD CSV
apiRoutes.post("/upload/page-language-mapper", multerUpload.single("fileCsv"),async (req, res, next) => {
    const whitelist = ['.csv'];
    if (!whitelist.includes(path.extname(req.file.path))) {
      res.status(400).json({
        "success": false,
        "message": "Invalid file type !"
      })
    }
    next();
  }, upload.upload);

module.exports = apiRoutes;