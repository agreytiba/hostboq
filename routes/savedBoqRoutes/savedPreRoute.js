const express = require('express')
const router = express.Router();
 const {getSavedPres, getSavedPre,updateSavedPre, setSavedPre, deleteSavedPre} = require("../../controllers/savedBoq/savedPreControllers")


router.route('/').get(getSavedPres).post(setSavedPre)

router.route('/:id').get(getSavedPre).put(updateSavedPre).delete(deleteSavedPre)

module.exports = router