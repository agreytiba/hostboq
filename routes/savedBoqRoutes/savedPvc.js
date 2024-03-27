const express = require('express')
const router = express.Router();
 const {getSavedPvcs,updateStatus, getSavedPvc,updateSavedPvc, setSavedPvc, deleteSavedPre} = require("../../controllers/savedBoq/savedPvc")


router.route('/').get(getSavedPvcs).post(setSavedPvc)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedPvc).put(updateSavedPvc).delete(deleteSavedPre)

module.exports = router