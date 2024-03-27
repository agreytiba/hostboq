const express = require('express')
const router = express.Router();
 const {getSavedBlandOutsides,updateStatus,getSavedBlandOutside,updateSavedBlandOutside, setSavedBlandOutside,deleteSavedBlandOutside} = require("../../controllers/savedBoq/savedBlandOutsideController")


router.route('/').get(getSavedBlandOutsides).post(setSavedBlandOutside)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedBlandOutside).put(updateSavedBlandOutside).delete(deleteSavedBlandOutside)

module.exports = router