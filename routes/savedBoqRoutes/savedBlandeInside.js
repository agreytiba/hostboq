const express = require('express')
const router = express.Router();
 const {getSavedBlandInsides,updateStatus, getSavedBlandInside,updateSavedBlandInside, setSavedBlandInside,deleteSavedBlandInside} = require("../../controllers/savedBoq/savedBlandInsideController")


router.route('/').get(getSavedBlandInsides).post(setSavedBlandInside)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedBlandInside).put(updateSavedBlandInside).delete(deleteSavedBlandInside)

module.exports = router