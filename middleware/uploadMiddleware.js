const multer = require("multer")
const path = require("path")


// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, "ramani" + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  }
    else {
    cb(new Error("Only PDF file are  allowed"),false)
    }
}

const upload = multer({ storage: storage, fileFilter:fileFilter }).single('pdf');

module.exports = upload