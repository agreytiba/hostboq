const express =require('express')
const router = express.Router();
 const {getMaterial, getMaterials, setMaterial, updateMaterial,deleteMaterial,getCountMaterial} = require("../controllers/materialControllers");


//   getmaterial , setMaterial have the same root address("/")
router.route('/').get(getMaterials).post(setMaterial)
router.route('/count').get(getCountMaterial)

// getMaterial,updateMaterial,deleteMaterial have the  same root address('/:id')
router.route('/:id').get(getMaterial).put(updateMaterial).delete(deleteMaterial)

module.exports = router