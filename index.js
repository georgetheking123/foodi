const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', db.getNfcs)
app.get('/nfcs', db.getNfcs)
app.get('/nfcs/:id', db.getNfcStatusById)
app.patch('/nfcs/:id', db.updateSwipedNfc)
app.patch('/nfcs', db.updateAllNfcs)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
