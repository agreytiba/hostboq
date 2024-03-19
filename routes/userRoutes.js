const express = require('express');
const router = express.Router();
const { getMe, loginUser, registerUser,getUsers,deleteUser,updateUser, getCountUsers, getCountWithUsers } = require('../controllers/userControllers');

// psot and get method on have same adress
router.route('/').post(registerUser).get(getUsers);
router.route('/admin').post(registerUser)
// route for login user (in simple way)
router.route('/login').post(loginUser);
router.route('/count').get(getCountUsers);
router.route('/countCustomer').get(getCountWithUsers);

//delete user,get single user,updateUser have same address (in simple way)
router.route('/:id').delete(deleteUser).get(getMe).put(updateUser);
;

module.exports = router;
