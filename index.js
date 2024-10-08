const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const app = express();
const multer = require("multer");
const PDF = require("./models/pdf");
const fs = require("fs");
const path = require("path");
app.use(cors());

//  connect to database
connectDB();
// allow to access  data by using req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use to change default error handler
app.use(errorHandler);

// START OF UPLOAD  PDF TO THE  DATABASE
// Configure Multer for file uploads
const upload = multer();

// API endpoint to receive and save multiple PDF files
app.post("/upload-pdf", upload.array("pdf", 10), async (req, res) => {
  try {
    const pdfFiles = req.files.map((file) => ({
      filename: file.originalname,
      data: file.buffer,
    }));

    const maps = await PDF.insertMany(pdfFiles);

    res.status(201).json({ maps });
  } catch (error) {
    console.error("Error uploading PDFs:", error);
    res.status(500).json({ error: "Failed to upload the PDFs" });
  }
});

// API endpoint to receive and save multiple PDF files
app.post("/", async (req, res) => {
  try {
   
    res.status(201).json("test");
  } catch (error) {
    console.error("Error uploading PDFs:", error);
    res.status(500).json("Failed to upload the PDFs" );
  }
});
// END OF UPLOAD TO DATABASE


// get pdf
app.get("/upload-pdf", async (req, res) => {
  try {
    // get maps with specefic id
    const { pdfId } = req.query;
    if (pdfId) {
      if (!pdfId) {
        return res.status(400).json({ error: "Missing pdfId parameter" });
      }

      const pdf = await PDF.findById(pdfId, "filename");
      res.json(pdf);
    } else {
      //  fetch all PDFs
      const allPDFs = await PDF.find({}, "filename");
      res.json(allPDFs);
    }
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ error: "Failed to fetch PDFs" });
  }
});

// GET SINGLE PDF

// API endpoint to get a single PDF file by ID
app.get("/get-pdf/:id", async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ error: "PDF not found" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${pdf.filename}`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf.data);
  } catch (error) {
    console.error("Error getting PDF:", error);
    res.status(500).json({ error: "Failed to get the PDF" });
  }
});

// GET END
// upload image


const axios = require('axios')
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';


app.post('/image', async (req, res) => {
  try {
      
        const imageBase64 = req.body.img;

        // Upload image to ImgBB
        const imgBbResponse = await axios.post(IMGBB_API_URL, {
            key:"9e47dccc3d270c1fd0ff3950f4f5f4cd",
            image:'https://api.imgbb.com/1/upload'
        });

        const imgBbData = imgBbResponse.data.data;

        return res.status(201).json(imgBbData);
    } catch (error) {
        console.error('Error creating blog post:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




// set the home route
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/maps", require("./routes/mapRoutes"));
app.use("/api/materials", require("./routes/materialRoutes"));
app.use("/api/purchases", require("./routes/purchaseRoutes"));
app.use("/api/blog", require("./routes/BlogRoutes"));
app.use("/api/upload", require("./routes/uploadRoute"));
app.use("/api/provider", require("./routes/providerRoutes"));
app.use("/api/file", require("./routes/testRoutes"));
app.use("/api/foundations", require("./routes/boqRoutes/foundationRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// boq data routes
app.use("/api/pre", require("./routes/boqRoutes/PreliminilaryRoutes"));
app.use("/api/substructure", require("./routes/boqRoutes/SubstructureRoutes"));
app.use("/api/walling", require("./routes/boqRoutes/wallingRoutes"));
app.use("/api/roofing", require("./routes/boqRoutes/roofingRoutes"));
app.use("/api/blandering", require("./routes/boqRoutes/blanderingRoutes"));
app.use("/api/gypsum", require("./routes/boqRoutes/gypsumRoutes"));
app.use("/api/pvc", require("./routes/boqRoutes/pvcRoutes"));
app.use("/api/skimming", require("./routes/boqRoutes/skimmingRoutes"));
app.use("/api/finishing", require("./routes/boqRoutes/finishingRoutes"));
app.use("/api/tiles", require("./routes/boqRoutes/tilesRoutes"));
app.use("/api/plastering", require("./routes/boqRoutes/plasteringRoutes"));
app.use("/api/electrical", require("./routes/boqRoutes/electricalRoutes"));
app.use("/api/windows", require("./routes/boqRoutes/windowRoutes"));
app.use("/api/doors", require("./routes/boqRoutes/doorRoutes"));
app.use("/api/plumbing", require("./routes/boqRoutes/plumbingRoutes"));

// boq saved routes
app.use("/api/savedpres", require("./routes/savedBoqRoutes/savedPreRoute"));
app.use("/api/savedfinishing", require("./routes/savedBoqRoutes/savedFinishingRoutes"));
app.use("/api/savedelectrical", require("./routes/savedBoqRoutes/savedElectricalRoutes"));
app.use("/api/savedgypsum", require("./routes/savedBoqRoutes/savedGypsumRoutes"));
app.use("/api/savedplastering", require("./routes/savedBoqRoutes/savedPlasteringRoutes"));
app.use("/api/savedroofing", require("./routes/savedBoqRoutes/savedRoofingRoutes"));
app.use("/api/savedtiles", require("./routes/savedBoqRoutes/savedTilesRoutes"));
app.use("/api/savedwalling", require("./routes/savedBoqRoutes/savedWallingRoutes"));
app.use("/api/savedpvcs", require("./routes/savedBoqRoutes/savedPvc"));
// add recently
app.use("/api/savedblinding", require("./routes/savedBoqRoutes/savedBlindingRoutes"));
app.use("/api/savedStrips", require("./routes/savedBoqRoutes/savedStripRoutes"));
app.use("/api/savedpads", require("./routes/savedBoqRoutes/SavedPadRoutes"));
app.use("/api/savedwallfoundations", require("./routes/savedBoqRoutes/savedWallFoundRoutes"));
app.use("/api/savedBeams", require("./routes/savedBoqRoutes/saveBeamRoutes"));
app.use("/api/savedconcretes", require("./routes/savedBoqRoutes/savedConcreteRoutes"));
app.use("/api/savedblandoutside", require("./routes/savedBoqRoutes/savedBlandOutsideRoutes"));
app.use("/api/savedblandinside", require("./routes/savedBoqRoutes/savedBlandeInside"));
app.use("/api/savedskiminside", require("./routes/savedBoqRoutes/savedSkimInsideRoutes"));
app.use("/api/savedskimoutside", require("./routes/savedBoqRoutes/savedSkimOutsideRoutes"));
app.use("/api/savedgrills", require("./routes/savedBoqRoutes/savedGrillRoutes"));
app.use("/api/savedpanels", require("./routes/savedBoqRoutes/savedPanelRoutes"));
app.use("/api/savedframes", require("./routes/savedBoqRoutes/savedFrameRoutes"));
app.use("/api/savedshutters", require("./routes/savedBoqRoutes/savedShutterRoutes"));
// use to change default error handler
app.use("/api/savedwaterIn", require("./routes/savedBoqRoutes/savedWaterInRoutes"));
app.use("/api/savedwaterOut", require("./routes/savedBoqRoutes/savedWaterOutRoutes"));
app.use("/api/savedfinishIn", require("./routes/savedBoqRoutes/savedFinishIn"));
app.use("/api/savedseptic", require("./routes/savedBoqRoutes/savedSepticRoutes"));
app.use("/api/savedsewageIn", require("./routes/savedBoqRoutes/savedSewageInRoutes"));
// use to change default error handler
app.use(errorHandler);

app.listen(port, () => console.log(`server running in port number ${port}`));
