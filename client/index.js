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

//PATCH mindmap name field
app.patch('/mindmaps/name', patchMindmap = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE mindmaps SET name = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Mindmap name updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})

//PATCH mindmap topic field
app.patch('/mindmaps/topic', patchMindmap = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE mindmaps SET topic = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Mindmap topic updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})

//PATCH mindmap shape field
app.patch('/mindmaps/shape', patchMindmap = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE mindmaps SET shape = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Mindmap shape updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})

//DELETE Mindmap
app.delete('/mindmaps', deleteMindmap = (request, response) => {
  const {id} = request.body
  pool.query(
    'DELETE FROM nodes WHERE mindmap = $1 ', [id], (error) => {  //Delete all nodes under mindmap
      if (error) {
        throw error
      }
      pool.query('DELETE FROM mindmaps WHERE id = $1 ', [id], (error) => {  //Delete mindmap from minmaps table
        if (error) {
          throw error
        }
      },)
      response.status(201).json({status: 'success', message: 'Mindmap deleted.'})
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

//POST Node
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

//PATCH nodes name field
app.patch('/nodes/name', patchNode = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE nodes SET name = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      else {
        const id1 = request.body.id;
        const mess = "Node name updated with id ".concat(id1)
        response.status(201).json({status: 'success', message: mess})
      }
    },)
})

//PATCH nodes parent field
app.patch('/nodes/parent', patchNode = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE nodes SET parent = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Node parent updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})


//PATCH nodes mindmap field
app.patch('/nodes/mindmap', patchNode = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE nodes SET mindmap = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Node mindmap updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})


//PATCH nodes shape field
app.patch('/nodes/shape', patchNode = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE nodes SET shape = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Node shape updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})

//PATCH nodes topic field
app.patch('/nodes/topic', patchNode = (request, response) => {
  const {setvalue, id} = request.body
  pool.query(
    'UPDATE nodes SET topic = ($1) WHERE id = ($2)',
    [setvalue, id],
    (error) => {
      if (error) {
        throw error
      }
      const id1 = request.body.id;
      const mess = "Node topic updated with id ".concat(id1)
      response.status(201).json({status: 'success', message: mess})
    },)
})

//DELETE Children
app.delete('/nodes', deleteMindmap = (request, response) => {
  const {id} = request.body
  let IDList = [id]
  nodeDelete(IDList) //Pass id of node as a list and delete node and all children of node using nodeDelete() -> (line 102)
  response.status(201).json({status: 'success', message: 'Nodes deleted.'})
})

//Helper function that recursively deletes all Active nodes and children of all Active nodes
function nodeDelete (listOfActiveNodesID) {
  for (i = 0; i < listOfActiveNodesID.length; i++) {
    let currentNodeID = listOfActiveNodesID[i]
    pool.query(
      'SELECT FROM nodes WHERE parent = $1', [currentNodeID], (error, results) => {  // Find children on current node
        if (error) {
          throw error
        }
        if (results.rowCount === 0) {  // if there are no children then delete current node
          pool.query(
            'DELETE FROM nodes WHERE id = $1 ', [currentNodeID], (error) => {
              if (error) {
                throw error
              }
            },)
        }
        else {  // if there are children find child node ids from nodes table and recursively call nodeDelete with child node ids
          pool.query(
            'SELECT id FROM nodes WHERE parent = $1', [currentNodeID], (error, result) => {
              if (error) {
                throw error
              }
              let childNodeIDs = []
              for (j = 0; j < result.rowCount; j++) {
                childNodeIDs.push(result.rows[j].id)
              }
              nodeDelete(childNodeIDs) // recursive call to delete children
              pool.query(
                'DELETE FROM nodes WHERE id = $1', [currentNodeID], (error) => {  // After all children have been deleted through recursive call delete current node
                  if (error) {
                    throw error
                  }
                },)
            },)
        }
      },)
    }
  }



// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
