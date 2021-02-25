const express = require('express')
const router = express.Router()
const CarController = require('../controllers/CarController')



router.get('/', CarController.showList)
// // otw
// router.get('/sewa/:id', CarController.rent);

router.get('/delete/:id', CarController.delete)
router.get('/add', CarController.addForm)
router.post('/add', CarController.addCar)


// menampilkan list cars dengan status rent
//router.get('/rent', CarController.showRentCars)



module.exports = router