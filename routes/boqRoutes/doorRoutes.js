const express = require('express')
const router = express.Router();
 const {getDoors, getDoor,updateDoor, setDoor, deleteDoor} = require("../../controllers/boqData/doorControllers")


router.route('/').get(getDoors).post(setDoor)


router.route('/:id').get(getDoor).put(updateDoor).delete(deleteDoor)

module.exports = router