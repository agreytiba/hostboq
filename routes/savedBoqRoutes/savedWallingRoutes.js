const express = require('express')
const router = express.Router();
 const {getSavedWallings,updateStatus, getSavedWalling,updateSavedWalling, setSavedWalling, deleteSavedWalling} = require("../../controllers/savedBoq/savedWallingController")


router.route('/').get(getSavedWallings).post(setSavedWalling)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedWalling).put(updateSavedWalling).delete(deleteSavedWalling)

module.exports = router