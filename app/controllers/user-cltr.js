const User=require('../models/user-model')
const _ = require('lodash')
const { validationResult } = require('express-validator')
const userCltr = {}

userCltr.list = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(e) {
        res.json(e) 
    }
}

userCltr.show = async (req, res) => {
    const id = req.params.id 
    try {
        const user= await user.findOne({ _id: id, userId: req.userId })
        if(!user) {
            res.status(404).json({})
        } else {
            res.json(user)
        }
    } catch(e) {
        res.json(e) 
    }
}

userCltr.update = async (req, res) => {
    const id = req.params.id 
    const body = req.body 
    try {
        const user= await User.findOneAndUpdate({_id: id, userId: req.userId }, body, { new: true }) 
        if(!user) {
            res.status(404).json({})
        } else {
            res.json(user) 
        }
    } catch(e) {
        res.json(e) 
    }
}

userCltr.delete  = async (req,res) => {
    const id = req.params.id 
    try {
        const user = await User.findOneAndDelete({ _id: id, userId: req.userId}) 
        if(!user) {
            res.status(404).json({})
        } else {
            res.json(user)
        }
    } catch(e) {
        res.json(e) 
    }
}

module.exports= userCltr