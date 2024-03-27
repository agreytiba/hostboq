const express = require('express')
const router = express.Router();
 const {getSavedFinishings,updateStatus, getSavedFinishing,updateSavedFinishing, setSavedFinishing, deleteSavedFinishing} = require("../../controllers/savedBoq/savedFinishingController")


router.route('/').get(getSavedFinishings).post(setSavedFinishing)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedFinishing).put(updateSavedFinishing).delete(deleteSavedFinishing)

module.exports = router