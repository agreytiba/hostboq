const express = require('express')
const router = express.Router();
 const {getGrills, getGrill,updateStatus,updateGrill, setGrill, deleteGrill} = require("../../controllers/savedBoq/SavedGrillController")


router.route('/').get(getGrills).post(setGrill)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getGrill).put(updateGrill).delete(deleteGrill)

module.exports = router