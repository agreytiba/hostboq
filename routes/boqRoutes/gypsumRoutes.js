const express = require('express')
const router = express.Router();
 const {getAllGypsum, getGypsum,updateGypsum, setGypsum, deleteGypsum} = require("../../controllers/boqData/gypsumController")


router.route('/').get(getAllGypsum).post(setGypsum)


router.route('/:id').get(getGypsum).put(updateGypsum).delete(deleteGypsum)

module.exports = router