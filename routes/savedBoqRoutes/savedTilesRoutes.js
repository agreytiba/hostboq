const express = require('express')
const router = express.Router();
 const {getSavedTiles, getSavedTile,updateSavedTile, setSavedTile, deleteSavedTile} = require("../../controllers/savedBoq/savedTilesController")


router.route('/').get(getSavedTiles).post(setSavedTile)

router.route('/:id').get(getSavedTile).put(updateSavedTile).delete(deleteSavedTile)

module.exports = router