const express = require('express')
const router = express.Router();
 const {getSavedSkimOutsides, getSavedSkimOutside,updateSavedSkimOutside, setSavedSkimOutside,deleteSavedSkimOutside} = require("../../controllers/savedBoq/savedSkimOutsideController")


router.route('/').get(getSavedSkimOutsides).post(setSavedSkimOutside)

router.route('/:id').get(getSavedSkimOutside).put(updateSavedSkimOutside).delete(deleteSavedSkimOutside)

module.exports = router