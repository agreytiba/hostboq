const asyncHandler = require("express-async-handler");

const Material = require("../models/materialModel");

// @desc Get all material add
// @route GET /api/materials
// @access private
const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find().sort({ createdAt: -1 });
  res.status(200).json(materials);
});

// count all material
const getCountMaterial = asyncHandler(async (req, res) => {
  // const maps = await Map.find()
  const counts = await Material.count();
  if (!counts) {
    res.json("no documents");
  }
  res.status(200).json(counts);
});

// @desc  create the materials
// @route POST /api/materials
// @access private
const setMaterial = asyncHandler(async (req, res) => {
  const materialsToAdd = req.body; // Array of material objects

  // Insert each material into the collection
  materialsToAdd.forEach(async (materialObj) => {
    const materialInstance = new Material(materialObj);
    try {
      await materialInstance.save();
      console.log(`Saved ${materialObj.material}`);
    } catch (error) {
      throw new Error(error);
    }
  });
  res.status(200).json("sucessful added");

  // const materialDetail = await Material.create(req.body)
  // res.status(200).json(materialDetail)
});
// @desc update material using the map id
// @route PUT /api/materails/:id
// @access private
const updateMaterial = asyncHandler(async (req, res) => {
  const materialId = req.params.id;
  const newPrice = req.body.newPrice; // Assuming you send the new price in the request body

  try {
    // Find the material by its unique identifier
    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Update the price field
    material.price = newPrice;

    // Save the updated material
    await material.save();

    res.json({
      message: "Price updated successfully",
      updatedMaterial: material,
    });
  } catch (error) {
    throw new Error(error);
    // res.status(500).json({ message: 'Internal server error' });
  }

  module.exports = router;
});
// @desc  get single   material detail using  id
// @route GET /api/materails/:id
// @access  private
const getMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);
  res.status(200).json(material);
});

// @desc  Delete single material detail
// @route DELETE /api/materials/:id
// @access private
const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

  // check for the material
  if (!material) {
    res.status(400);
    throw new Error("ramani haipo");
  }

  await Material.findOneAndDelete(req.params.id);
  res.status(200).json("material successfully deleted");
});
module.exports = {
  getMaterials,
  getCountMaterial,
  getMaterial,
  updateMaterial,
  setMaterial,
  deleteMaterial,
};
