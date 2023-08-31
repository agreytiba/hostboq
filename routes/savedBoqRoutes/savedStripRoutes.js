const express = require('express')
const router = express.Router();
 const {getSavedStrips, getSavedStrip,updateSavedStrip, setSavedStrip, deleteSavedStrip} = require("../../controllers/savedBoq/savedStripController")


router.route('/').get(getSavedStrips).post(setSavedStrip)

router.route('/:id').get(getSavedStrip).put(updateSavedStrip).delete(deleteSavedStrip)

module.exports = router