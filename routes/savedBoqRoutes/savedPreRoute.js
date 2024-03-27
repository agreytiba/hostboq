const express = require('express')
const router = express.Router();
 const {getSavedPres, getSavedPre,updateSavedPre, setSavedPre, deleteSavedPre, updateStatusPre} = require("../../controllers/savedBoq/savedPreControllers")


router.route('/').get(getSavedPres).post(setSavedPre)
router.route('/status/:id').post(updateStatusPre)

router.route('/:id').get(getSavedPre).put(updateSavedPre).delete(deleteSavedPre)

module.exports = router