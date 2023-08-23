const express = require('express')
const router = express.Router();
 const {getProvider, getProviders, setProvider, updateProvider,deleteProvider} = require("../controllers/providerController")

//   getmaterial , setProvider have the same root address("/")
router.route('/').get(getProviders).post(setProvider)

// getProvider,updateProvider,deleteProvider have the  same root address('/:id')
router.route('/:id').get(getProvider).put(updateProvider).delete(deleteProvider)

module.exports = router