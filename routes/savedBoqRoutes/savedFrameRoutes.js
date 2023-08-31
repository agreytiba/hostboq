const express = require('express')
const router = express.Router();
 const {getFrames, getFrame,updateFrame, setFrame, deleteFrame} = require("../../controllers/savedBoq/savedDoorFrameController")


router.route('/').get(getFrames).post(setFrame)

router.route('/:id').get(getFrame).put(updateFrame).delete(deleteFrame)

module.exports = router