const express = require('express')
const router = express.Router();
 const {getAllSubstructure, getSubstructure,updateSubstructure, setSubstructure, deleteSubstructure} = require("../../controllers/boqData/substructureController")


router.route('/').get(getAllSubstructure).post(setSubstructure)


router.route('/:id').get(getSubstructure).put(updateSubstructure).delete(deleteSubstructure)

module.exports = router