const User = require('../models/User');

const getAllUser = async (req, res) => {
    const users = await User.find({});
    return res.status(200).json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id);
    res.status(200).json(user)
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    if(!username) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid Input',
        })
    }
    await User.findByIdAndUpdate(id, {username}, {new: true})
    return res.status(201).json({
        status: 'success',
        message: 'Data berhasil diupdate'
    })
}

const deleteUserById = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete({_id : id})
    return res.status(200).json({
        status: 'success',
        message: 'Data berhasil dihapus'
    })
}

module.exports = { getAllUser, getUserById, updateUserById, deleteUserById };