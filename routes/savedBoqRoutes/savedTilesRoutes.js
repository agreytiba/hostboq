const express = require('express')
const router = express.Router();
 const {getSavedTiles,updateStatus, getSavedTile,updateSavedTile, setSavedTile, deleteSavedTile} = require("../../controllers/savedBoq/savedTilesController")


router.route('/').get(getSavedTiles).post(setSavedTile)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedTile).put(updateSavedTile).delete(deleteSavedTile)

module.exports = router