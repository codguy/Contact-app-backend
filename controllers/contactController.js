const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');


//@description get all contacts
//@route GET /api/contacts
//@access private
const getAllContact = asyncHandler(async (req, res) => {
    const contacts = await contactModel.find();
    res.status(200).json(contacts);
});

//@description create new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    
    const { name, email, age } = req.body;
    const user_id = req.user._id;
    if (!name || !email || !age) {
        res.status(400);
        throw new Error("All fields must be filled");
    }


    const contact = await contactModel.create({ name, email, age, user_id });
    res.status(200).json({ message: "Contact info saved", data: contact });
});

//@description get a contact
//@route GET /api/contacts:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ message: "Contact contact info", data: contact });
});


//@description update a contact
//@route PUT /api/contacts:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact = await contactModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json({ message: "Update contact info", data: updatedContact });
});

//@description update a contact
//@route DELETE /api/contacts:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await contactModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Deleted contact info" });
});

module.exports = {
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
};