const mongoose= require ('mongoose')
const {Schema,model}= mongoose

const hotelSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    distance:{
        type:String,
        required:true
    },
    photos:{
       type:[String]
    },
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5
    },
    rooms:{
        type:[String]
    },
    cheapestPrice:{
        type:Number,
        required:true
    },
    featured:{
        type:Boolean,
        required:false
    },
    description:{
        type:String,
        required:true
    }

})

const Hotel=model('Hotel',hotelSchema)
module.exports=Hotel