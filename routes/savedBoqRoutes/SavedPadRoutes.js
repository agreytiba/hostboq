const express = require('express')
const router = express.Router();
 const {getSavedPads, getSavedPad,updateSavedPad, setSavedPad, deleteSavedPad} = require("../../controllers/savedBoq/savedPadController")


router.route('/').get(getSavedPads).post(setSavedPad)

router.route('/:id').get(getSavedPad).put(updateSavedPad).delete(deleteSavedPad)

module.exports = router