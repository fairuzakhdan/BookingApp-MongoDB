const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

const getAllHotel = async (req, res) => {
    const {min, max, ...others} = req.query;
    const hotels = await Hotel.find({...others, cheapestPrice: {$gt: min || 1,  $lt: max || 999000}}).limit(req.query.limit)
    return res.status(200).json({
        status: 'success',
        hotels,
    })
}

const getHotelById = async (req, res) => {
    const { hotelId } = req.params;
    const hotel = await Hotel.findById(hotelId)
    return res.status(200).json({
        status: 'success',
        hotel,
    })
}

const createNewHotel = async (req, res) => {
    try {
    const hotels = {
        name: req.body.name,
        type: req.body.type,
        city: req.body.city,
        address: req.body.address,
        distance: req.body.distance,
        description: req.body.description,
        rating: req.body.rating,
        cheapestPrice: req.body.cheapestPrice,
        featured: req.body.featured,
    }
    const newHotel = new Hotel(hotels);
    await newHotel.save();
    return res.status(201).json({
        status: 'success',
        message: 'Success Add Hotel'
    })
    }catch (err) {
        console.log(err.message);
    }
}

const updateNewHotel = async (req, res) => {
    try {
    const { hotelId } = req.params;
    const hotels = {
        name: req.body.name,
        type: req.body.type,
        city: req.body.city,
        address: req.body.address,
        distance: req.body.distance,
        description: req.body.description,
        rating: req.body.rating,
        cheapestPrice: req.body.cheapestPrice,
        featured: req.body.featured,
    }
    await Hotel.findByIdAndUpdate(hotelId, hotels, {new: true});
    return res.status(201).json({
        status: 'success',
        message: 'Data berhasil diupdate'
    })
    } catch(err) {
        console.log(err.message);
    }
}

const deleteHotelById = async (req, res) => {
    const { hotelId } = req.params;
    await Hotel.findByIdAndDelete({_id : hotelId})
    return res.status(200).json({
        status: 'success',
        message: 'Data berhasil didelete',
    })
}

const countByCity = async (req, res) => {
    try {
        const citiesQuery = req.query.cities;
        if (!citiesQuery) {
            return res.status(400).json({ error: "Cities query parameter is required" });
        }

        const cities = citiesQuery.split(',');
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city });
        }));

        return res.status(200).json(list);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const countByType = async (req, res) => {
    try {
        const hotelCount = await Hotel.countDocuments({type:'hotel'})
        const apartmentCount = await Hotel.countDocuments({type:'apartment'})
        const resortCount = await Hotel.countDocuments({type:'resort'})
        const villaCount = await Hotel.countDocuments({type:'villa'})
        const cabinCount = await Hotel.countDocuments({type:'cabin'})


        return res.status(200).json([
            {type: 'hotels', count: hotelCount},
            {type: 'apartments', count: apartmentCount},
            {type: 'resorts', count: resortCount},
            {type: 'villas', count: villaCount},
            {type: 'cabins', count: cabinCount},
        ]);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getHotelByRoomId = async (req, res) => {
    const { roomId } = req.params;

    try {
        const hotel = await Hotel.findById(roomId);
        const list = await Promise.all(hotel.rooms.map(async (room) => {
            return await Room.findById(room);
        }));
        if(list.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Room Not Found'
            })
        }
        return res.status(200).json(list);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error });
    }
};

module.exports = { createNewHotel, updateNewHotel, getAllHotel,getHotelById, deleteHotelById, countByCity, countByType, getHotelByRoomId };