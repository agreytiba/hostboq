const asyncHandler = require("express-async-handler");

const Panel = require("../../models/savedBoqModels/savedAlpanelModel");

// @desc Get all Panel add
// @route GET /api/Panel
// @access private
const getPanels = asyncHandler(async (req, res) => {
    const savedElectri = await Panel.find().populate("panelData.materialId");
  res.status(200).json(savedElectri);
});

// @desc  create the Panel
// @route POST /api/Panel
// @access private
const setPanel = asyncHandler(async (req, res) => {
   const { mapId } = req.body;

  try {
    // Check if a record with the provided mapId exists
    const existingSaved = await Panel.findOne({ mapId });

    if (existingSaved) {
      // Respond with existing data
      return res.status(200).json(existingSaved);
    }

    // Create a new Panel record if it doesn't exist
    const newSaved = await Panel.create(req.body);
    res.status(201).json(newSaved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
   
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updatePanel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity, materialId } = req.body;

  try {
    const Saved = await Panel.findById(id);
    if (!Saved) {
      return res.status(404).json({ message: 'Panel not found' });
    }

   // Find the index of the existing panelData entry with matching materialId
    const existingIndex = Saved.panelData.findIndex(data => data.materialId == materialId);

    if (existingIndex !== -1) {
      // Update the quantity for the existing materialId
      Saved.panelData[existingIndex].quantity = quantity;
     const updatedSaved= await Saved.save();

      res.status(200).json(updatedSaved);
    }
    else {
      // Add quantity and materialId to panelData array
      Saved.panelData.push({ quantity, materialId });
     const createdSaved= await Saved.save();
      res.status(200).json(createdSaved);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// @desc  get single   Panel detail using  id
// @route GET /api/materails/:id
// @access  private
const getPanel = asyncHandler(async (req, res) => {
  const data = await Panel.findById(req.params.id);
  res.status(200).json(data);
});

// @desc  Delete single savepre detail
// @route DELETE /api/Panel/:id
// @access private
const deletePanel = asyncHandler(async (req, res) => {
  const singleData = await Panel.findById(req.params.id);

  // check for the singleData
  if (!singleData) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Panel.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getPanels,
  getPanel,
  updatePanel,
  setPanel,
  deletePanel,
};
