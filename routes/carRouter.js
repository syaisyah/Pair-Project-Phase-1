const express = require('express')
const router = express.Router()
const CarController = require('../controllers/CarController')



router.get('/', CarController.showList)
router.get('/add', CarController.addForm)
router.post('/add', CarController.addCar)
router.get('/edit/:id', CarController.editForm)
router.post('/edit/:id', CarController.updateCar)
router.get('/delete/:id', CarController.delete)


// menampilkan list cars dengan status rent
router.get('/rent', CarController.showRentCars)



module.exports = router