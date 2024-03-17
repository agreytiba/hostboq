const  express = require('express')
const router =express.Router()
const { getMap, getMaps, setMap, updateMapdetails, deleteMap, getMapsMaboresho, getMapsTypeCheck, getMapsUnitCheck, getMapsFailed, getMapsSuccess } = require("../controllers/mapControllers")
const {protect} = require("../middleware/authMiddleware")

//  post and get all maps method have the same root address("/")
router.route('/').get(getMaps).post(setMap)
router.route('/failedCheck').get(getMapsMaboresho)
router.route('/typeCheck').get(getMapsTypeCheck)
router.route('/unitCheck').get(getMapsUnitCheck)
router.route('/failed').get(getMapsFailed)
router.route('/successful').get(getMapsSuccess)


// getMap, update,delet map details have the same root address
router.route('/:id').get(getMap).delete(protect,deleteMap).put(updateMapdetails)

module.exports = router