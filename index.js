const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

//GET all mindmaps
const GETMindmaps = (request, response) => {
  pool.query('SELECT * FROM mindmaps', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//GET all children
const GETChildren = (request, response) => {
  pool.query('SELECT * FROM children', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//POST Mindmap
const POSTMindmap = (request, response) => {
  const {name, topic, shape} = request.body
  pool.query(
    'INSERT INTO mindmaps (name, topic, shape) VALUES ($1, $2, $3)',
    [name, topic, shape],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Mindmap added.'})
    },)
}

//POST Children
const POSTChildren = (request, response) => {
  const {name, parent, topic, shape} = request.body

  pool.query(
    'INSERT INTO children (name, parent, topic, shape) VALUES ($1, $2, $3, $4)',
    [name, parent, topic, shape],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Child added.'})
    },
  )
}

app
  .route('/mindmaps')
  // GET endpoint
  .get(GETMindmaps)
  // POST endpoint
  .post(POSTMindmap)
  //HOW DO YOU SUPPORT MULTIPLE ROUTES IN THE SAME APP??
  //.route('/mindmaps/children')
  // GET endpoint
  //.get(GETChildren)
  // POST endpoint
  //.post(POSTChildren)

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
