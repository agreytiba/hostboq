const express = require('express')
const router = express.Router();
 const {getPlumbings, getPlumbing,updatePlumbing, setPlumbing, deletePlumbing} = require("../../controllers/boqData/plumbingControllers")


router.route('/').get(getPlumbings).post(setPlumbing)


router.route('/:id').get(getPlumbing).put(updatePlumbing).delete(deletePlumbing)

module.exports = router