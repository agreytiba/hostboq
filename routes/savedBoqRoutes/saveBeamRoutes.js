const express = require('express')
const router = express.Router();
 const {getSavedBeams, getSavedBeam,updateSavedBeam, setSavedBeam, deleteSavedBeam} = require("../../controllers/savedBoq/savedBeamController")


router.route('/').get(getSavedBeams).post(setSavedBeam)

router.route('/:id').get(getSavedBeam).put(updateSavedBeam).delete(deleteSavedBeam)

module.exports = router