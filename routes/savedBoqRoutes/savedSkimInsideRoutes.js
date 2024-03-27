const express = require('express')
const router = express.Router();
 const {getSavedSkimInsides,updateStatus, getSavedSkimInside,updateSavedSkimInside, setSavedSkimInside,deleteSavedSkimInside} = require("../../controllers/savedBoq/savedSkimInsideController")


router.route('/').get(getSavedSkimInsides).post(setSavedSkimInside)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedSkimInside).put(updateSavedSkimInside).delete(deleteSavedSkimInside)

module.exports = router