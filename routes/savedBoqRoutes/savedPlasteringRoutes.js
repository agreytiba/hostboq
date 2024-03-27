const express = require('express')
const router = express.Router();
 const {getSavedPlasters,updateStatus, getSavedPlaster,updateSavedPlaster, setSavedPlaster, deleteSavedPlaster} = require("../../controllers/savedBoq/savedPlasteringController")


router.route('/').get(getSavedPlasters).post(setSavedPlaster)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedPlaster).put(updateSavedPlaster).delete(deleteSavedPlaster)

module.exports = router