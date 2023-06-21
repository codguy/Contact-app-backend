const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@description get all users
//@route GET /api/user/view-all
//@access public
const getAllUser = asyncHandler(async (req, res) => {
    const users = await userModel.find();
    res.status(200).json(users);
});

//@description create new user
//@route POST /api/user/register
//@access public
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields must be filled");
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashPassword });
    res.status(200).json({ message: "user info saved", data: user });
});

//@description get a user
//@route GET /api/user/view:id
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields must be filled");
    }
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Incorect email or password");
    }
    res.status(200).json({ message: "user user info", data: user });
});

//@description get a user
//@route GET /api/user/view:id
//@access public
const getUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("user not found");
    }
    res.status(200).json({ message: "user user info", data: user });
});


//@description update a user
//@route PUT /api/user/update:id
//@access public
const updateUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("user not found");
    }
    if (!req.params.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    let updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ message: "Update user info", data: updatedUser });
});

//@description update a user
//@route DELETE /api/user/delete:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("user not found");
    }
    await userModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Deleted user info" });
});

module.exports = {
    getAllUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser
};