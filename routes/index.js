const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const carRouter = require('./carRouter')

const HomeController = require('../controllers/HomeController')
const CarController = require('../controllers/CarController')
const UserController = require('../controllers/UserController')



router.get('/', HomeController.home)
router.use('/cars', carRouter)
router.use('/users', userRouter)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = router