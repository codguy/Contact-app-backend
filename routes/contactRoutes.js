const express = require('express');
const router = express.Router();
const {
    createContact,
    getContact,
    updateContact,
    deleteContact,
    getAllContact
} = require('../controllers/contactController');
const validateToken = require('../middleware/ValidateUserToken');

router.get('/', validateToken, getAllContact);
router.post('/', validateToken, createContact);
router.get('/:id', validateToken, getContact);
router.put('/:id', validateToken, updateContact);
router.delete('/:id', validateToken, deleteContact);


module.exports = router;