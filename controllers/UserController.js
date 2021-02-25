const { User, Car, UserCar } = require('../models')
const converDate = require('../helpers/convertDate')
const formatRupiah = require('../helpers/formatRupiah')


class UserController {
  static addForm(req, res) {
    res.render('formUser')
  }

  static addUser(req, res) {
    //console.log(req.body)
    const { first_name, last_name, identity_number, phone_number, age, address, gender } = req.body;
    let newUser = { first_name, last_name, identity_number, phone_number, age, address, gender };
    User.create(newUser)
      .then(user => {
        res.redirect('/users')
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static showList(req, res) {
    User.findAll({
      order: [['first_name', 'ASC']]
    })
      .then(users => {
        //console.log(users)
        res.render('listUser', { data: users })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
  }

  static editForm(req, res) {
    const { id } = req.params;
    User.findByPk(+id)
      .then(user => {
        if (!user) res.render('dataNotFound', { search: 'id' })
        else {
          res.render('editFormUser', { user })
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateUser(req, res) {
    let id = +req.params.id;
    let { first_name, last_name, identity_number, phone_number, age, address, gender } = req.body;
    let updateUser = { first_name, last_name, identity_number, phone_number, age, address, gender };
    User.update(updateUser, {
      where: {
        id: id
      }
    })
      .then(user => {
        res.redirect('/users')
      })
      .catch(err => {
        res.send(err)
      })
  }


  static delete(req, res) {
    const { id } = req.params;
    User.destroy({
      where: {
        id: +id
      }
    })
      .then(data => {
        if (!data) res.render('dataNotFound', { search: 'id' })
        else {
          res.redirect('/users/')
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
  // untuk detil showRent Car by user nya
  static showRentCarsByUser(req, res) {
    let id = +req.params.id;
    //nyari data di UserCars jika ada id sesuai id User, ambil juga data cars nya

    UserCar.findAll({
      where: {
        UserId: id
      },
      include: [User, Car]
    })
      .then(dataUserCars => {
        //res.send(dataUserCars)

        if (dataUserCars.length > 0) {
          // console.log(dataUserCars)
          dataUserCars.forEach(el => {
            el.rental_price_per_day = formatRupiah(el.Car.rental_price_per_day)
            el.newStartDate = converDate(el.start_date)
            el.newFinishDate = converDate(el.finish_date)
            el.totalDay = UserCar.getTotalDay(el.start_date, el.finish_date)
            el.totalPrice = formatRupiah(Number(el.totalDay) * Number(el.Car.rental_price_per_day))
          })
          res.render('showRentCarByPerUser', { dataUserCars })
        }
        else {
          // tapi ini bisa dihapus karena kalo user udah ga nyewa, ngapain masi disimpen di database
          res.send(`The user hasn't rented any car yet`)
        }
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })

  }



}

module.exports = UserController