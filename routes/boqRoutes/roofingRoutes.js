const express = require('express')
const router = express.Router();
 const {getAllRoofing, getRoofing,updateRoofing, setRoofing, deleteRoofing} = require("../../controllers/boqData/roofingController")


router.route('/').get(getAllRoofing).post(setRoofing)


router.route('/:id').get(getRoofing).put(updateRoofing).delete(deleteRoofing)

module.exports = router