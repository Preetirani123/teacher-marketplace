const express = require("express");
const router = express.Router();
const { indexOps } = require('./helperFunctions');

module.exports = (db, client) => {
  

  

  router.get("/", (req, res) => {
    indexOps(db)
      .then(products => {
        
        res.send(products)
      
      })
      .catch(e => {
        res.send(e);
      });

  });

  router.get("/store", (req, res) => {
    indexOps(db)
      .then(products => {
        
        
        console.log(products)
        async function run () {
          for (let p of products) {
              await client.index({
                index: 'products',
                id: p.id,
                body: {
                  name: p.name,
                  description: p.description
                }
              })
          } 
          await client.indices.refresh({ index: 'products' })
        } 
        run(products).catch(console.log)
        res.send(products)
      
      })
      .catch(e => {
        res.send(e);
      });

  });

  router.get("/:data",(req, res) =>  {
   

    // const { body } = await client.search({
    //   index: 'game-of-thrones',
    //   // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    //   body: {
    //     query: {
    //       match: { quote: req.params.data }
    //     }
    //   }
    // })
    // res.send(body.hits.hits)

    
  });

  router.post('/create/:id', (req, res) => {
   
    const n = req.body.name
    const d = req.body.desc
    const id = req.params.id
    async function run () {
      
          await client.index({
            index: 'products',
            id: id,
            body: {
              name: n,
              description: d
            }
          })
       
      await client.indices.refresh({ index: 'products' })
    } 
    run(n, d, id).catch(console.log)
    res.send('inserted')
  })

  router.post('/delete', (req, res) => {
    client.indices.delete({
      index: '_all'
    }, function(err, resp) {
  
      if (err) {
          res.send(err.message);
      } else {
          res.send('Indexes have been deleted!');
      }
    });
  })

  router.post('/update/:id', (req, res) => {
     const id = req.params.id
     const val = {n : req.body.name, d : req.body.desc, id: id}
     console.log(val)
     async function run (val) {
          await client.update({
            index: 'products',
            id: val.id,
            body: {
              doc: {
                name: val.n,
                description: val.d
              }
            }
          })
     }
     run(val).catch(console.log)
     res.send("check")
  });

  router.post('/delete/:id', (req, res) => {
    const id = req.params.id
    async function run (id) {
        await client.delete({
          index: "products",
          id: id
        });
    }
    run(id).catch(console.log)
    res.send("deleted")

  });

  return router;
};
