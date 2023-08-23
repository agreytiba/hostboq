const Upload = require("../models/uploadModel")
const asyncHandler = require('express-async-handler')
const multer = require("multer")
const path = require("path")
const upload = require("../middleware/uploadMiddleware")


// upload  pdf from the  user
const setUpload = asyncHandler((req, res) => {

  upload(req, res, (err) => {
    if (err) {
      console.log(err)
    }
    else {
      const newUpload = new Upload({
        filename: req.file.filename,
        path: req.file.path,
        originalname: req.file.originalname
      })
      newUpload.save()
        .then((data) => {res.json(data);})
        .catch(error =>console.log(error))
    }
  })

}
) 

module.exports = {
setUpload
};