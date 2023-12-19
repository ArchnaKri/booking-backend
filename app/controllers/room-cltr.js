const Hotel = require('../models/hotel-model')
const Room=require('../models/room-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')
const roomCltr = {}

roomCltr.list = async (req, res) => {
    try {
        const room= await Room.find()
        res.json(room)
    } catch(e) {
        res.status(500).json(e) 
    }
}

roomCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const body = req.body 
    const hotelId=req.params.hotelid;
    const room = new Room(body) 
    try {
        const saveRoom=await room.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms:saveRoom._id},
            })
        }catch(e){
            res(e)
        }
        res.json(saveRoom)
    } catch(e) {
        res.status(500).json(e)
    }
}

roomCltr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const room= await room.findOne({ _id: id, userId: req.userId })
        if(!room) {
            res.status(404).json({})
        } else {
            res.json(room)
        }
    } catch(e) {
        res.json(e) 
    }
}

roomCltr.update = async (req, res) => {
    const id = req.params.id 
    const body = req.body 
    try {
        const room= await Room.findOneAndUpdate({_id: id, userId: req.userId }, body, { new: true }) 
        if(!room) {
            res.status(404).json({})
        } else {
            res.json(room) 
        }
    } catch(e) {
        res.json(e) 
    }
}

roomCltr.delete  = async (req,res,next) => {
    const hotelId = req.params.hotelid 
    try {
        const room = await Room.findOneAndDelete(req.params.id) 
        try{
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            })
        }catch(e){
            next(e)
        }
    } catch(e) {
        next(e) 
    }
}

module.exports=roomCltr