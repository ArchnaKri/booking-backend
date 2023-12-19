const Hotel = require('../models/hotel-model')
//const Room =require('../models/room-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')
const hotelCltr = {}

hotelCltr.list=async(req,res)=>{
    try{
        const hotel=await Hotel.find(req.query)
        res.status(200).json(hotel)
    }catch(err){
        res.json(err)
    }
}

hotelCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    const hotel = new Hotel(body) 
    try {
        await hotel.save()
        res.json(hotel)
    } catch(e) {
        res.status(500).json(e)
    }
}

hotelCltr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const hotel= await hotel.findOne({ _id: id, userId: req.userId })
        if(!hotel) {
            res.status(404).json({})
        } else {
            res.json(hotel)
        }
    } catch(e) {
        res.json(e) 
    }
}

hotelCltr.update = async (req, res) => {
    const id = req.params.id 
    const body = req.body 
    try {
        const hotel= await Hotel.findOneAndUpdate({_id: id, userId: req.userId }, body, { new: true }) 
        if(!hotel) {
            res.status(404).json({})
        } else {
            res.json(hotel) 
        }
    } catch(e) {
        res.json(e) 
    }
}

hotelCltr.delete  = async (req,res) => {
    const id = req.params.id 
    try {
        const hotel = await Hotel.findOneAndDelete({ _id: id, userId: req.userId}) 
        if(!hotel) {
            res.status(404).json({})
        } else {
            res.json(hotel)
        }
    } catch(e) {
        res.json(e) 
    }
}

hotelCltr.countByCity=async(req,res)=>{
    const cities=req.query.cities.split(",")
    try{
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    }catch(err){
        res.json(err)
    }
}

hotelCltr.countByType=async(req,res)=>{
    try{
        const hotelCount=await Hotel.countDocuments({type:"hotel"})
        const apartmentCount=await Hotel.countDocuments({type:"apartment"})
        const resortCount=await Hotel.countDocuments({type:"resort"})
        const villaCount=await Hotel.countDocuments({type:"villa"})
        const cabinCount=await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotels", count:hotelCount},
            {type:"apartments", count:apartmentCount},
            {type:"resorts", count:resortCount},
            {type:"villas", count:villaCount},
            {type:"cabins", count:cabinCount}
        ])
    }catch(err){
        res.json(err)
    }
}
/*hotelCltr.getHotelRooms=async(res,req)=>{
    try{
        const hotel=await Hotel.findById(res.params.id)
        const list=Promise.all(hotel.room.map(room=>{
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }catch(e){
        res(e)
    }
}*/

module.exports=hotelCltr