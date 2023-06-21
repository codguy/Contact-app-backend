const express = require('express');
const router = express.Router();
const {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUser,
    loginUser
} = require('../controllers/userController');
const validateToken = require('../middleware/ValidateUserToken');

router.get('/view-all', validateToken, getAllUser);
router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/view/:id', validateToken, getUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);


module.exports = router;