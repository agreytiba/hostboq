const express = require('express')
const router = express.Router();
 const {getAllSaved,updateStatus, getSavedById,updateSaved, setSaved, deleteSaved} = require("../../controllers/savedBoq/savedWaterOutController")

router.route('/').get(getAllSaved).post(setSaved)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedById).put(updateSaved).delete(deleteSaved)

module.exports = router