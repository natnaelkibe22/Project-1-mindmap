const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

/*
----------------------------------------------------------------------------
Mindmap table routes
----------------------------------------------------------------------------
*/

//GET all mindmaps
app.get('/mindmaps', getMindmaps = (request, response) => {
  pool.query('SELECT * FROM mindmaps', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})

//POST Mindmap
app.post('/mindmaps', postMindmap = (request, response) => {
  const {id, name, topic, shape} = request.body
  pool.query(
    'INSERT INTO mindmaps (id, name, topic, shape) VALUES ($1, $2, $3, $4)',
    [id, name, topic, shape],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Mindmap added.'})
    },)
})

/*
----------------------------------------------------------------------------
Node table routes
----------------------------------------------------------------------------
*/

//GET all nodes
app.get('/nodes', getNode = (request, response) => {
  pool.query('SELECT * FROM nodes', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
})



//POST Children
app.post('/nodes', postNode = (request, response) => {
  const { id, name, parent, mindmap, topic, shape } = request.body

  pool.query(
    'INSERT INTO nodes (id, name, parent, mindmap, topic, shape) VALUES ($1, $2, $3, $4, $5, $6)',
    [id, name, parent, mindmap, topic, shape],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Node added.'})
    },)
})

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
