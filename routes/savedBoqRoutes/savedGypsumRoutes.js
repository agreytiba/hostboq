const express = require('express')
const router = express.Router();
 const {getSavedGypsums,updateStatus, getSavedGypsum,updateSavedGypsum, setSavedGypsum, deleteSavedGypsum} = require("../../controllers/savedBoq/savedGypsumController")


router.route('/').get(getSavedGypsums).post(setSavedGypsum)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedGypsum).put(updateSavedGypsum).delete(deleteSavedGypsum)

module.exports = router