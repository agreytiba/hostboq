const express = require('express')
const router = express.Router();
 const {getSavedBlindings,updateStatus,getSavedBlinding,updateSavedBlinding, setSavedBlinding, deleteSavedBlinding} = require("../../controllers/savedBoq/savedBlindingController")


router.route('/').get(getSavedBlindings).post(setSavedBlinding)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedBlinding).put(updateSavedBlinding).delete(deleteSavedBlinding)

module.exports = router