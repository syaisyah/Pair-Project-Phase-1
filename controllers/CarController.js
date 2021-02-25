const { Car, User, UserCars } = require('../models')
const formatRupiah = require('../helpers/formatRupiah')


class CarController {
  static showList(req, res) {
    Car.findAll({
      order: [['rental_price_per_day', 'ASC']]
    })
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


  static addForm(req, res) {
    res.render('addFormCar')
  }

  static addCar(req, res) {
    let { merk, type, category, released_year, rental_price_per_day, imageURL, status, plat_number } = req.body;
    let newCar = { merk, type, category, released_year, rental_price_per_day, imageURL, status, plat_number }

    Car.create(newCar)
      .then(car => {
        res.redirect('/cars')
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static editForm(req, res) {
    const { id } = req.params;
    Car.findByPk(+id)
      .then(car => {
        if (!car) res.render('dataNotFound', { search: 'id' })
        else {
          res.render('editFormCar', { car })
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateCar(req, res) {
    let id = +req.params.id;
    let { merk, type, category, released_year, rental_price_per_day, imageURL, status, plat_number } = req.body;
    let updateCar = { merk, type, category, released_year, rental_price_per_day, imageURL, status, plat_number }
    Car.update(updateCar, {
      where: {
        id: id
      }
    })
      .then(car => {
        res.redirect('/cars')
      })
      .catch(err => {
        res.send(err)
      })
  }


}

module.exports = CarController