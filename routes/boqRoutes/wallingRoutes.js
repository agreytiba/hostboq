const express = require('express')
const router = express.Router();
 const {getAllWalling, getWalling,updateWalling, setWalling, deleteWalling} = require("../../controllers/boqData/wallingControllers")


router.route('/').get(getAllWalling).post(setWalling)


router.route('/:id').get(getWalling).put(updateWalling).delete(deleteWalling)

module.exports = router