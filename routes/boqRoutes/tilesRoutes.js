const express = require('express')
const router = express.Router();
 const {getAllTiles, getTile,updateTile, setTile, deleteTile} = require("../../controllers/boqData/tilesController")


router.route('/').get(getAllTiles).post(setTile)


router.route('/:id').get(getTile).put(updateTile).delete(deleteTile)

module.exports = router