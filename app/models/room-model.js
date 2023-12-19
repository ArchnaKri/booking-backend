const mongoose= require ('mongoose')
const {Schema,model}= mongoose

const roomSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    maxPeople:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    roomNumbers:[{Number:Number, unavaliableDates:{type:[Date]}}],
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const Room=model('Room',roomSchema)
module.exports=Room