const express = require('express')
const router = express.Router();
 const {getFoundation,getFoundations,setFoundation,updateFoundation,deleteFoundation} = require("../../controllers/boqData/foundationControllers")

//   getFoundation , se,gettFoundation have the same root address("/")
router.route('/').get(getFoundations).post(setFoundation)

// getFoundation,updateFoundation,deleteFoundation have the  same root address('/:id')
router.route('/:id').get(getFoundation).put(updateFoundation).delete(deleteFoundation)

module.exports = router