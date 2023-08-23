const PDF = require('../models/pdf')
const asyncHandler = require('express-async-handler')
const multer = require("multer")

// Configure Multer for file uploads
const upload = multer();

// upload  pdf from the  user
const setTest = asyncHandler(upload.single('pdf'),async(req, res) => {

  try {
    const pdfData = {
      filename: req.file.originalname,
      data: req.file.buffer,
    };

    const pdf = new PDF(pdfData);
    await pdf.save();

    res.status(201).json({ message: 'PDF uploaded successfully' });
  } catch (error) {
    console.error('Error uploading PDF:', error);
    res.status(500).json({ error: 'Failed to upload the PDF' });
  }



}
) 

module.exports = {
setTest
};