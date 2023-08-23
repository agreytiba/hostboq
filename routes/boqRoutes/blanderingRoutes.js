const express = require('express')
const router = express.Router();
 const {getAllBlandering, getBlandering,updateBlandering, setBlandering, deleteBlandering} = require("../../controllers/boqData/blanderingControllers")


router.route('/').get(getAllBlandering).post(setBlandering)


router.route('/:id').get(getBlandering).put(updateBlandering).delete(deleteBlandering)

module.exports = router