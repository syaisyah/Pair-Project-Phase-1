const express = require('express')
const app = express()
const port = 3001
const router = require('./routes')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', router)



app.listen(port, () => {
  console.log(`This app listening at http://localhost:${port}`)
})