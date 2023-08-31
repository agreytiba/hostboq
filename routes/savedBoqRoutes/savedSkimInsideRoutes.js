const express = require('express')
const router = express.Router();
 const {getSavedSkimInsides, getSavedSkimInside,updateSavedSkimInside, setSavedSkimInside,deleteSavedSkimInside} = require("../../controllers/savedBoq/savedSkimInsideController")


router.route('/').get(getSavedSkimInsides).post(setSavedSkimInside)

router.route('/:id').get(getSavedSkimInside).put(updateSavedSkimInside).delete(deleteSavedSkimInside)

module.exports = router