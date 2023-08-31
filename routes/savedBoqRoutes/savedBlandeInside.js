const express = require('express')
const router = express.Router();
 const {getSavedBlandInsides, getSavedBlandInside,updateSavedBlandInside, setSavedBlandInside,deleteSavedBlandInside} = require("../../controllers/savedBoq/savedBlandInsideController")


router.route('/').get(getSavedBlandInsides).post(setSavedBlandInside)

router.route('/:id').get(getSavedBlandInside).put(updateSavedBlandInside).delete(deleteSavedBlandInside)

module.exports = router