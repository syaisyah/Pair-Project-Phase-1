const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.showList)
router.get('/add', UserController.addForm)
router.post('/add', UserController.addUser)
router.get('/edit/:id', UserController.editForm)
router.post('/edit/:id', UserController.updateUser)
router.get('/delete/:id', UserController.delete)
//menampilkan daftar cars yang di sewa oleh user dengan id tsb
router.get('/cars/rent/:id', UserController.showRentCarsByUser)


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = router