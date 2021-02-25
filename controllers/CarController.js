const { Car, User, UserCars } = require('../models')
const formatRupiah = require('../helpers/formatRupiah')

class CarController {
  static showList(req, res) {
    Car.findAll()
      .then(cars => {

        cars.forEach(el => {
          el.rupiah = formatRupiah(el.rental_price_per_day)
        })

        res.render('carList', { data: cars })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static delete(req, res) {
    const { id } = req.params;
    Car.destroy({
      where: {
        id: +id
      }
    })
      .then(car => {
        if (!car) res.render('dataNotFound', { search: 'id' })
        else {
          res.redirect('/cars/')
        }
      })
      .catch(err => {
        res.send(err)
      })
  }


  // router: /cars/rent // menampilkan list cars dengan status rent
  static showRentCars(req, res) {
    // /showRentCars.ejs
    Car.findAll({
      where: {
        status: 'Rent'
      }
    })
      .then(cars => {
        cars.forEach(el => {
          el.rupiah = formatRupiah(el.rental_price_per_day)
        })
        res.render('showRentCars', { data: cars })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

}

module.exports = CarController