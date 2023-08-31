const express = require('express')
const router = express.Router();
 const {getSavedWallFounds, getSavedWallFound,updateSavedWallFound, setSavedWallFound, deleteSavedWallFound} = require("../../controllers/savedBoq/savedWallFoundController")


router.route('/').get(getSavedWallFounds).post(setSavedWallFound)

router.route('/:id').get(getSavedWallFound).put(updateSavedWallFound).delete(deleteSavedWallFound)

module.exports = router