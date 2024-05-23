const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

const createNewRoom = async (req, res) => {
    try {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId);
    const newRoom = new Room(req.body)
    hotel.rooms.push(newRoom)
    await hotel.save()
    await newRoom.save()
    res.status(201).json({status: 'success'})
    } catch(err) {
        console.log(err.message);
    }
}

const updateNewRoom = async (req, res) => {
    try {
    const { roomId } = req.params;
    const updateRoom = await Room.findByIdAndUpdate(roomId, {$set: req.body}, {new: true});
    return res.status(201).json({
        status: 'success',
        message: 'Data berhasil diupdate',
        updateRoom
    })
    } catch(err) {
        console.log(err.message);
    }
}
const deleteRoomById = async (req, res) => {
    const { roomId, hotelId } = req.params;
    await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms : roomId}});
    const findRoom = await Room.findByIdAndDelete(roomId)
    if (!findRoom) {
        return res.status(404).json({
            status: 'fail',
            message: 'Data tidak ditemukan'
        })
    }
    return res.status(200).json({
        status: 'success',
        message: 'Data berhasil didelete',
    })
}

const getAllRoom = async (req, res) => {
    const rooms = await Room.find({})
    return res.status(200).json({
        status: 'success',
        rooms,
    })
}

const getRoomById = async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    return res.status(200).json({
        status: 'success',
        room,
    })
}

const updateRoomAvailability = async (req, res) => {
    const {roomId} = req.params
    await Room.updateOne({'roomNumbers._id' : roomId}, {$push: {'roomNumbers.$.unavailableDates': req.body.dates}})
    return res.status(201).json({status: 'success'})
}

module.exports = { createNewRoom, updateNewRoom, getRoomById, getAllRoom, deleteRoomById, updateRoomAvailability}