const asyncHandler = require("express-async-handler");

const Frame = require("../../models/savedBoqModels/savedDoorFrame");

// @desc Get all Frame add
// @route GET /api/Frame
// @access private
const getFrames = asyncHandler(async (req, res) => {
    const savedElectri = await Frame.find().populate("frameData.materialId");
  res.status(200).json(savedElectri);
});

// @desc  create the Frame
// @route POST /api/Frame
// @access private
const setFrame = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await Frame.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new Frame record if it doesn't exist
    const newSaved = await Frame.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateFrame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await Frame.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'Frame not found' });
    }

   // Find the index of the existing frameData entry with matching materialId
    const existingIndex = Saved.frameData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.frameData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to frameData array
      Saved.frameData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   Frame detail using  id
// @route GET /api/materails/:id
// @access  private
const getFrame = asyncHandler(async (req, res) => {
  const data = await Frame.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/Frame/:id
// @access private
const deleteFrame = asyncHandler(async (req, res) => {
  const singleData = await Frame.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Frame.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getFrames,
  getFrame,
  updateFrame,
  setFrame,
  deleteFrame,
};
