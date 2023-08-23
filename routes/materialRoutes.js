const express = require('express')
const router = express.Router();
 const {getMaterial, getMaterials, setMaterial, updateMaterial,deleteMaterial} = require("../controllers/materialControllers")

//   getmaterial , setMaterial have the same root address("/")
router.route('/').get(getMaterials).post(setMaterial)

// getMaterial,updateMaterial,deleteMaterial have the  same root address('/:id')
router.route('/:id').get(getMaterial).put(updateMaterial).delete(deleteMaterial)

module.exports = router