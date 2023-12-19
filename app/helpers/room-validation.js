const Room=require('../models/room-model')
const roomValidationSchema={
    title: {
        notEmpty: {
            errorMessage: 'title is required'
        }
    },
    maxPeople: {
        notEmpty: {
            errorMessage: 'maxPeople is required'
        }
    },
    roomNumbers: {
        notEmpty: {
            errorMessage: 'roomNumber is required'
        }
    },
    price:{
        notEmpty:{
            errorMessage:'price is required'
        }
    },
    description:{
        notEmpty:{
            errorMessage:'description is required'
        }
    }
}

module.exports = roomValidationSchema
