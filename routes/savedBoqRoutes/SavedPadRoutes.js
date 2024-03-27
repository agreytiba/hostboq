const express = require('express')
const router = express.Router();
 const {getSavedPads,updateStatus, getSavedPad,updateSavedPad, setSavedPad, deleteSavedPad} = require("../../controllers/savedBoq/savedPadController")


router.route('/').get(getSavedPads).post(setSavedPad)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedPad).put(updateSavedPad).delete(deleteSavedPad)

module.exports = router