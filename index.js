const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getMindmaps = (request, response) => {
  pool.query('SELECT * FROM mindmaps', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addMindmap = (request, response) => {
  const {center, topic, subtopic} = request.body

  pool.query(
    'INSERT INTO mindmaps (center, topic, subtopic) VALUES ($1, $2, $3)',
    [center, topic, subtopic],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Mindmap added.'})
    },
  )
}

app
  .route('/mindmaps')
  // GET endpoint
  .get(getMindmaps)
  // POST endpoint
  .post(addMindmap)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
