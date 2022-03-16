const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');
require("dotenv").config();

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', db.setNfcs)
app.get('/nfcs/add/:id', db.addNfc)
app.get('/nfcs', db.getNfcs)
app.get('/nfcs/:id', db.getNfcStatusById)
app.patch('/nfcs/:id', db.updateSwipedNfc)
app.get('/nfcs/reset', db.updateAllNfcs)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
