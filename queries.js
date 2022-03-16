const Pool = require('pg').Pool
require("dotenv").config();
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false }
})

const getNfcs = (request, response) => {
    pool.query('SELECT * FROM nfcs', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getNfcStatusById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query(`SELECT was_swiped FROM nfcs WHERE nfc_id = '${id}'`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const updateSwipedNfc = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query(`UPDATE nfcs SET was_swiped = true WHERE nfc_id = '${id}'`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}

const updateAllNfcs = (request, response) => {
    pool.query(`UPDATE nfcs SET was_swiped = false`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}

module.exports = {
    getNfcs,
    getNfcStatusById,
    updateSwipedNfc,
    updateAllNfcs
};
