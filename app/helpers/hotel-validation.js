const Hotel = require('../models/hotel-model')

const hotelValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'hotel name is required'
        },
        custom: {
            options: async (value) => {
                const hotel= await Hotel.findOne({ name: { '$regex' : value, $options: 'i'}})
                if(!hotel) {
                    return true 
                } else {
                    throw new Error('hotel already present')
                }
            }
        }
        
    }, 
    type: {
        notEmpty: {
            errorMessage: 'type is required'
        }
    },

    city: {
        notEmpty: {
            errorMessage: 'city is required'
        }
    },
    address: {
        notEmpty: {
            errorMessage: 'address is required'
        }
    },
    title: {
        notEmpty: {
            errorMessage: 'title is required'
        }
    },
    cheapestPrice:{
        notEmpty:{
            errorMessage:'price is required'
        }
    },
    featured:{
        notEmpty:{
            errorMessage:'description is required'
        }
    },
    description:{
        notEmpty:{
            errorMessage:'description is required'
        }
    }
}

module.exports = hotelValidationSchema