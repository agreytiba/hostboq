const express = require('express')
const router = express.Router();
 const {getSavedRoofings, getSavedRoofing,updateSavedRoofing, setSavedRoofing, deleteSavedRoofing} = require("../../controllers/savedBoq/savedRoofingController")


router.route('/').get(getSavedRoofings).post(setSavedRoofing)

router.route('/:id').get(getSavedRoofing).put(updateSavedRoofing).delete(deleteSavedRoofing)

module.exports = router