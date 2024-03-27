const express = require('express')
const router = express.Router();
 const {getSavedWallFounds,updateStatus, getSavedWallFound,updateSavedWallFound, setSavedWallFound, deleteSavedWallFound} = require("../../controllers/savedBoq/savedWallFoundController")


router.route('/').get(getSavedWallFounds).post(setSavedWallFound)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedWallFound).put(updateSavedWallFound).delete(deleteSavedWallFound)

module.exports = router