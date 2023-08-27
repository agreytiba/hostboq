const express = require('express')
const router = express.Router();
 const {getAllElectrical, getElectrical,updateElectrical, setElectrical, deleteElectrical} = require("../../controllers/boqData/electricalController")


router.route('/').get(getAllElectrical).post(setElectrical)


router.route('/:id').get(getElectrical).put(updateElectrical).delete(deleteElectrical)

module.exports = router