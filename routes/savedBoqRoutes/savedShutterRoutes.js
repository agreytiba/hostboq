const express = require('express')
const router = express.Router();
 const {getShutters,updateStatus, getShutter,updateShutter, setShutter, deleteShutter} = require("../../controllers/savedBoq/savedDoorShutterController")


router.route('/').get(getShutters).post(setShutter)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getShutter).put(updateShutter).delete(deleteShutter)

module.exports = router