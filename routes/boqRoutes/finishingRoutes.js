const express = require('express')
const router = express.Router();
 const {getAllFinishings, getFinishing,updateFinishing,setFinishing, deleteFinishing} = require("../../controllers/boqData/finishingController")


router.route('/').get(getAllFinishings).post(setFinishing)


router.route('/:id').get(getFinishing).put(updateFinishing).delete(deleteFinishing)

module.exports = router