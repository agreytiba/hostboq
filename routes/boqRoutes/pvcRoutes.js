const express = require('express')
const router = express.Router();
 const {getAllPvc, getPvc,updatePvc, setPvc, deletePvc} = require("../../controllers/boqData/pvcControllers")


router.route('/').get(getAllPvc).post(setPvc)


router.route('/:id').get(getPvc).put(updatePvc).delete(deletePvc)

module.exports = router