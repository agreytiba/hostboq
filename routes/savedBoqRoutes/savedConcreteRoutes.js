const express = require('express')
const router = express.Router();
 const {getSavedConcretes,updateStatus, getSavedConcrete,updateSavedConcrete, setSavedConcrete, deleteSavedConcrete} = require("../../controllers/savedBoq/savedConcerateController")


router.route('/').get(getSavedConcretes).post(setSavedConcrete)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getSavedConcrete).put(updateSavedConcrete).delete(deleteSavedConcrete)

module.exports = router