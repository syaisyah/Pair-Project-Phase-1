const express = require('express')
const router = express.Router()
const CarController = require('../controllers/CarController')



router.get('/', CarController.showList)

router.get('/sewa/:id', (req, res) => {
  res.send('Hello World!')
});

router.get('/delete/:id', CarController.delete)

// menampilkan list cars dengan status rent
router.get('/rent', CarController.showRentCars)



module.exports = router