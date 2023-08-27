const express = require('express')
const router = express.Router();
 const {getSavedPvcs, getSavedPvc,updateSavedPvc, setSavedPvc, deleteSavedPre} = require("../../controllers/savedBoq/savedPvc")


router.route('/').get(getSavedPvcs).post(setSavedPvc)

router.route('/:id').get(getSavedPvc).put(updateSavedPvc).delete(deleteSavedPre)

module.exports = router