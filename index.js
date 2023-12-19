require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')
const configureDB = require('./config/db')

const authCltr=require('./app/controllers/auth-cltr')
const userCltr=require('./app/controllers/user-cltr')
const hotelCltr=require('./app/controllers/hotel-cltr')
const roomCltr=require('./app/controllers/room-cltr')

const { authenticateUser } = require('./app/middlewares/authentication')

const { userRegisterValidationSchema, userLoginValidationSchema } = require('./app/helpers/user-validation')
const hotelValidationSchema=require('./app/helpers/hotel-validation')
const roomValidationSchema=require('./app/helpers/room-validation')


const port =  3098
const app = express() 
app.use(express.json())
app.use(cors()) 
configureDB()

app.post('/api/auth/register', checkSchema(userRegisterValidationSchema), authCltr.register)
app.post('/api/auth/login', checkSchema(userLoginValidationSchema), authCltr.login)
app.get('/api/auth/account', authenticateUser, authCltr.account)

app.get('/api/users',userCltr.list)
app.put('/api/user/:id',userCltr.update)
app.delete('/api/user/:id',userCltr.delete)
app.get('/api/user/show',userCltr.show)

app.get('/api/hotels',hotelCltr.list)
app.post('/api/hotel/create',authenticateUser,checkSchema(hotelValidationSchema),hotelCltr.create)
app.put('/api/hotel/:id',authenticateUser,checkSchema(hotelValidationSchema),hotelCltr.update)
app.delete('/api/hotel/:id',authenticateUser,checkSchema(hotelValidationSchema),hotelCltr.delete)
app.get('/api/hotel/find/:id',checkSchema(hotelValidationSchema),hotelCltr.show)

app.get("/api/hotels/countByCity",hotelCltr.countByCity)
app.get("/api/hotels/countByType", hotelCltr.countByType)

app.get('/api/rooms',roomCltr.list)
app.post('/api/room/:hotelid',authenticateUser,checkSchema(roomValidationSchema),roomCltr.create)
app.put('/api/room/:id',authenticateUser,checkSchema(roomValidationSchema),roomCltr.update)
app.delete('/api/room/:hotelid',authenticateUser,checkSchema(roomValidationSchema),roomCltr.delete)
app.get('/api/room/:id',checkSchema(roomValidationSchema),roomCltr.show)





app.listen(port, () => {
    console.log('server running on port', port)
})
