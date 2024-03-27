const express = require('express')
const router = express.Router();
 const {getSavedSkimOutsides,updateStatus, getSavedSkimOutside,updateSavedSkimOutside, setSavedSkimOutside,deleteSavedSkimOutside} = require("../../controllers/savedBoq/savedSkimOutsideController")


router.route('/').get(getSavedSkimOutsides).post(setSavedSkimOutside)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedSkimOutside).put(updateSavedSkimOutside).delete(deleteSavedSkimOutside)

module.exports = router