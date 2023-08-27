const express = require('express')
const router = express.Router();
 const {getWindows, getWindow,updateWindow, setWindow, deleteWindow} = require("../../controllers/boqData/windowControllers")


router.route('/').get(getWindows).post(setWindow)


router.route('/:id').get(getWindow).put(updateWindow).delete(deleteWindow)

module.exports = router