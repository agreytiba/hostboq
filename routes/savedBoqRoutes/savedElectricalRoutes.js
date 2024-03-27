const express = require('express')
const router = express.Router();
 const {getSavedElectricals,updateStatus, getSavedElectrical,updateSavedElectrical, setSavedElectrical, deleteSavedElectrical} = require("../../controllers/savedBoq/savedElectricalController")


router.route('/').get(getSavedElectricals).post(setSavedElectrical)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedElectrical).put(updateSavedElectrical).delete(deleteSavedElectrical)

module.exports = router