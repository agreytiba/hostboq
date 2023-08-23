const express = require('express')
const router = express.Router();
 const {getAllSkimming, getSkimming,updateSkimming, setSkimming, deleteSkimming} = require("../../controllers/boqData/skimmingControllers")


router.route('/').get(getAllSkimming).post(setSkimming)


router.route('/:id').get(getSkimming).put(updateSkimming).delete(deleteSkimming)

module.exports = router