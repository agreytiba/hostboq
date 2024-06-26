const asyncHandler = require("express-async-handler");
const Map = require("../models/mapsDetailsModel");
const PDF = require("../models/pdf");
const User = require("../models/userModel");
// @desc Get all maps submitted
// @route GET /api/maps
// @access private
const getMaps = asyncHandler(async (req, res) => {
  // const maps = await Map.find()

  const maps = await Map.find().sort({ createdAt: -1 });
  if (!maps) {
    res.json({error: "hakuna ramania iliyoko kwenye mfumo"});
  }
  res.status(200).json(maps);
});

// count under type check
const getCountMaps = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Map.count();
  if (!counts) {
    res.json({error: "no documents"});
  }
  res.status(200).json(counts);
});
// @desc Get all maps under maboresho
// @route GET /api/maps
// @access private
const getMapsMaboresho = asyncHandler(async (req, res) => {
  // const maps = await Map.find()

  const maps = await Map.find({ status: "maboresho" }).sort({ createdAt: -1 });
  if (!maps) {
    res.json({error: "hakuna ramania iliyoko kwenye mfumo"});
  }
  res.status(200).json(maps);
});

// count maboresho
const getCountMaboresho = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Map.count({ status: "maboresho" });
  if (!counts) {
    res.json({error: "no documents"});
  }
  res.status(200).json(counts);
});
// @desc Get all maps under  type checker user
// @route GET /api/maps
// @access private
const getMapsTypeCheck = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const maps = await Map.find({ status: "imetumwa" }).sort({ createdAt: -1 });
  if (!maps) {
    res.json({error: "hakuna ramania iliyoko kwenye mfumo"});
  }
  res.status(200).json(maps);
});
// count under type check
const getCountTypeCheck = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Map.count({ status: "imetumwa"});
  if (!counts) {
    res.json({error: "no documents"});
  }
  res.status(200).json(counts);
});
// ge  all under  check unit user
const getMapsUnitCheck = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const maps = await Map.find({ status: "vipimo" }).sort({ createdAt: -1 });
  if (!maps) {
    res.json({ error: "hakuna ramania iliyoko kwenye mfumo" });
  }
  res.status(200).json(maps);
});


// count under type check
const getCountUnitCheck = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Map.count({ status: "imetumwa"});
  if (!counts) {
    res.json({error: "no documents"});
  }
  res.status(200).json(counts);
});
// get all  maps failed
const getMapsFailed = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const maps = await Map.find({ status: "failed" }).sort({ createdAt: -1 });
  if (!maps) {
    res.json({error: "hakuna ramania iliyoko kwenye mfumo"});
  }
  res.status(200).json(maps);
});

// count under type check
const getCountFailed = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Map.count({ status: "failed" });
  if (!counts) {
    res.json({errror: "no documents"});
  }
  res.status(200).json(counts);
});
// get all  maps failed
const getMapsSuccess= asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const maps = await Map.find({ status:"boq" }).sort({ createdAt: -1 });
  if (!maps) {
    res.json({error: "hakuna ramania iliyoko kwenye mfumo"});
  }
  res.status(200).json(maps);
});

// count under type check
const getCountBoq = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Map.count({ status: "boq" });
  if (!counts) {
    res.json({error: "no documents"});
  }
  res.status(200).json(counts);
});
// @desc set  upload map to system
// @route POST /api/maps
// @access private
const setMap = asyncHandler(async (req, res) => {
  const data = req.body;
  if (!data) {
    res.status(400).json({error: "jaza form"});
  }
  const map = await Map.create(data);
  res.status(200).json(map);
});
// @desc update map using the map id
// @route PUT /api/maps/:id
// @access private
const updateMapdetails = asyncHandler(async (req, res) => {
  const mapDetails = await Map.findById(req.params.id);
  if (!mapDetails) {
    res.status(400).json({error: "Hii ramani haipo"});
  }

  // Check if the request body contains a 'status' property
  if (req.body.status !== undefined) {
    // If 'status' property exists, update the status in the mapDetails object
    mapDetails.status = req.body.status;
  }
  if (req.body.checkComment !== undefined) {
    const newStatus = "maboresho";
    mapDetails.checkComment = req.body.checkComment;
    mapDetails.status = newStatus;
  }
  if (req.body.unitComment !== undefined) {
    const newStatus = "maboresho";
    mapDetails.unitComment = req.body.unitComment;
    mapDetails.status = newStatus;
  }
  if (req.body.suggestionOnMap !== undefined) {
    const newStatus = "failed";
    mapDetails.suggestionOnMap = req.body.suggestionOnMap;
    mapDetails.status = newStatus;
  }
  const updatedMap = await Map.findByIdAndUpdate(req.params.id, mapDetails, {
    new: true,
  });
  res.status(200).json(updatedMap);
});

// @desc updateStatus map using the map id
// @route PUT /api/maps/:id
// @access private

// @desc  get single  map detail using map  id
// @route GET /api/mapse/:id
// @access  private
const getMap = asyncHandler(async (req, res) => {
  const mapDetail = await Map.findById(req.params.id);
  res.status(200).json(mapDetail);
});

// @desc  Delete single map details
// @route DELETE /api/maps/:id
// @access private
const deleteMap = asyncHandler(async (req, res) => {
  try {
    const mapId = req.params.id;

    // Find the map to delete
    const map = await Map.findById(mapId);
    if (!map) {
      return res.status(404).json({ error: "Map not found" });
    }

    // Delete associated PDFs
    const pdfIds = map.mapIds;
    if (pdfIds.length > 0) {
      await PDF.deleteMany({ _id: { $in: pdfIds } });
    }

    // Delete the map
    await Map.findByIdAndDelete(mapId);

    return res
      .status(200)
      .json({ message: "Map and associated PDFs deleted successfully" });
  } catch (error) {
    console.error("Error deleting map:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = {
  getMaps,
  getMap,
  updateMapdetails,
  setMap,
  deleteMap,
  getMapsMaboresho,
  getMapsTypeCheck,
  getMapsUnitCheck,
  getMapsFailed,
  getMapsSuccess,
  getCountMaboresho,
  getCountTypeCheck,
  getCountUnitCheck,
  getCountFailed,
  getCountBoq,
  getCountMaps
};
