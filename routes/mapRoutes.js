const  express = require('express')
const router =express.Router()
const { getMap, getMaps, setMap, updateMapdetails, deleteMap } = require("../controllers/mapControllers")
const {protect} = require("../middleware/authMiddleware")
//  post and get all maps method have the same root address("/")
router.route('/').get(getMaps).post(setMap)


// getMap, update,delet map details have the same root address
router.route('/:id').get(getMap).delete(protect,deleteMap).put(updateMapdetails)

module.exports = router