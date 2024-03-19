const  express = require('express')
const router =express.Router()
const { getMap, getMaps, setMap, updateMapdetails, deleteMap, getMapsMaboresho, getMapsTypeCheck, getMapsUnitCheck, getMapsFailed, getMapsSuccess, getCountMaps, getCountMaboresho, getCountTypeCheck, getCountUnitCheck, getCountFailed, getCountBoq } = require("../controllers/mapControllers")
const {protect} = require("../middleware/authMiddleware")

//  post and get all maps method have the same root address("/")
router.route('/').get(getMaps).post(setMap)
router.route('/count').get(getCountMaps)
router.route('/failedCheck').get(getMapsMaboresho)
router.route('/failedCheck/count').get(getCountMaboresho)
router.route('/typeCheck').get(getMapsTypeCheck)
router.route('/typeCheck/count').get(getCountTypeCheck)
router.route('/unitCheck').get(getMapsUnitCheck)
router.route('/unitCheck/count').get(getCountUnitCheck)
router.route('/failed/count').get(getCountFailed)
router.route('/successful').get(getMapsSuccess)
router.route('/successful/count').get(getCountBoq)


// getMap, update,delet map details have the same root address
router.route('/:id').get(getMap).delete(protect,deleteMap).put(updateMapdetails)

module.exports = router