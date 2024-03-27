const express = require('express')
const router = express.Router();
 const {getPanels, getPanel,updateStatus,updatePanel, setPanel, deletePanel} = require("../../controllers/savedBoq/savedWindowPanelController")


router.route('/').get(getPanels).post(setPanel)
router.route('/status/:id').post(updateStatus)
router.route('/:id').get(getPanel).put(updatePanel).delete(deletePanel)

module.exports = router