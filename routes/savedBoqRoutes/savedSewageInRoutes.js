const express = require('express')
const router = express.Router();
 const {getAllSaved, getSavedById,updateSaved, setSaved, deleteSaved} = require("../../controllers/savedBoq/savedSewageInController")

router.route('/').get(getAllSaved).post(setSaved)

router.route('/:id').get(getSavedById).put(updateSaved).delete(deleteSaved)

module.exports = router