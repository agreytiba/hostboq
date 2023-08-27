const express = require('express')
const router = express.Router();
 const {getSavedElectricals, getSavedElectrical,updateSavedElectrical, setSavedElectrical, deleteSavedElectrical} = require("../../controllers/savedBoq/savedElectricalController")


router.route('/').get(getSavedElectricals).post(setSavedElectrical)

router.route('/:id').get(getSavedElectrical).put(updateSavedElectrical).delete(deleteSavedElectrical)

module.exports = router