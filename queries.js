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

const setNfcs = async (req, res) => {
  await pool.query('DROP TABLE IF EXISTS nfcs;')
  await pool.query('CREATE TABLE nfcs (nfc_id bigint PRIMARY KEY, was_swiped BOOLEAN DEFAULT false);')
  await pool.query("INSERT INTO nfcs(nfc_id) VALUES('41052215');")
  await pool.query("INSERT INTO nfcs(nfc_id) VALUES('41052212');")

}

const addNfc = async ({ params: { id }}, res) => {
  await pool.query(`INSERT INTO nfcs(nfc_id) VALUES('${id}');`)	
}

const getNfcs = async (request, response) => {
    await pool.query('SELECT * FROM nfcs', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getNfcStatusById = async ({ params: { id }}, response) => {
    await pool.query(`SELECT was_swiped FROM nfcs WHERE nfc_id = '${parseInt(id)}'`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const updateSwipedNfc = async (request, response) => {
    const id = parseInt(request.params.id)
  
    await pool.query(`UPDATE nfcs SET was_swiped = true WHERE nfc_id = '${id}'`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}

const updateAllNfcs = async (request, response) => {
    await pool.query(`UPDATE nfcs SET was_swiped = false`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}

module.exports = {
	setNfcs,
    getNfcs,
    getNfcStatusById,
    updateSwipedNfc,
    updateAllNfcs,
    addNfc
};
