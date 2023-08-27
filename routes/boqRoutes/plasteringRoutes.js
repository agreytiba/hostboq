const express = require('express')
const router = express.Router();
 const {getAllPlastering, getPlastering,updatePlastering, setPlastering, deletePlastering} = require("../../controllers/boqData/PlasteringController")


router.route('/').get(getAllPlastering).post(setPlastering)


router.route('/:id').get(getPlastering).put(updatePlastering).delete(deletePlastering)

module.exports = router