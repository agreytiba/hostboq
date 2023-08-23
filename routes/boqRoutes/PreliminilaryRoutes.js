const express = require('express')
const router = express.Router();
 const {getPreliminilarys, getPreliminilary,updatePre, setPreliminilary, deletePre} = require("../../controllers/boqData/preliminilaryController")

//   getmaterial , setMaterial have the same root address("/")
router.route('/').get(getPreliminilarys).post(setPreliminilary)

// getPre,updatePreliminary,deleteMaterial have the  same root address('/:id')
router.route('/:id').get(getPreliminilary).put(updatePre).delete(deletePre)

module.exports = router