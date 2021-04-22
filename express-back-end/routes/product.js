const { SimpleDB } = require("aws-sdk");
const express = require("express");
const router = express.Router();
const { getSearch, addSearch, getProducts, getProductsByFilters, insertProduct, updateProduct, deleteProduct, getProduct, indexOps } = require('./helperFunctions');
const stringSimilarity = require("string-similarity");

module.exports = (db, client) => {
  

  async function sim (id, res, products) {
     console.log(id)

     getSearch(id, db)
     .then((resp) => {
      
      console.log(resp)
      let sTerms = resp.map(e => e.searchterms).join(' ')
      console.log(sTerms)
      let prods = []
      for (let p of products) {
        let score = stringSimilarity.compareTwoStrings(sTerms, p.description)
        p['score'] = score
      }
      products.sort((a, b) => {
        return b.score - a.score;
      })
      
      console.log(products[0])









      res.send(products);
    })
  }

  //get all products
  router.get("/", (req, res) => {
    getProducts(db)
      .then(products => {
        
        if(req.session && req.session.user_id) {
           console.log(req.session.user_id)
           sim(req.session.user_id, res, products).catch(console.log)
           return;
        }
        res.send(products)
      })
      .catch(e => {
        res.send(e);
      });
  });




  async function run_as (id, em, sch) {
    addSearch(id, em, sch, db)
    .then((resp) => {
      console.log(resp)
      //res.send(resp);
    })
  }

  //Get a specific product
  router.get("/:productID", (req, res) => {
      const productID = req.params.productID;
      getProduct(productID, db)
        .then(products => {
          
    
          if ((req.session && req.session.user_id)) {
            console.log(req.session.user_id)
            console.log(req.session.email)
            console.log(products[0].description)
            run_as(req.session.user_id, req.session.email, products[0].description).catch(console.log)
           
          }
          res.send(products)
        
        })
        .catch(e => {
          res.send(e);
        });
  });

  router.get('/search/:u_id', (req, res) => {
    getSearch(req.params.u_id, db)
    .then(terms => {
      console.log(terms)
      res.send(terms)
    })
    .catch(e => {
      res.send(e);
    });
  });

  

  //creates a new product
  router.post("/", (req,res) => {
    
    const userID = req.body.user_id;
    const name = req.body.name;
    const description = req.body.text_description;
    const categoryID = req.body.categoryID // may need to perform calculations to see what category its in
    const price = req.body.price;
    const thumbnail_url = req.body.thumbnail_url;
    const subject_id = req.body.subject_id;// may need to perform calculations to see what category its in
    const grade = req.body.grade; // may need to perform calculations to see what category its in
    const province = req.body.province; // may need to perform calculations to see what category its in
    insertProduct(
          userID,
          name,
          categoryID,
          description,
          price,
          thumbnail_url,
          subject_id,
          grade,
          province,
          db
    )
    .then((product) => {
 
         
          res.send(product)
    })
    .catch(e => { res.send(e);});


      
  })


  // router.post('/filter', (req, res) => {
     
  //   const conds = req.body
  //   console.log(conds)
  //   getProductsByFilters(db, conds)
  //     // .then(products => res.send(products))
  //     // .catch(e => {
  //     //   res.send(e);
  //     // });

  // })
     

  // Update the product
  router.put("/:productID", (req,res) => {
    // const userID = req.session.user_id; /// < ------ Uncomment this and delete next line when code is running.
  
    
    const name = req.body.name;
    const productID = req.params.productID
    const description = req.body.description;
    const categoryID = req.body.categoryID // need to perform calculations to see what category its in
    const price = req.body.price;
    const thumbnail_url = req.body.thumbnail_url;
    const subject_id = req.body.subject_id;// need to perform calculations to see what category its in
    const grade = req.body.grade; // need to perform calculations to see what category its in
    const province = req.body.province; // need to perform calculations to see what category its in
    console.log(productID, name, description, categoryID, price, thumbnail_url, subject_id, grade, province)
    updateProduct(
          productID,
          name,
          categoryID,
          description,
          price,
          thumbnail_url,
          subject_id,
          grade,
          province,
          db
        )
      .then((product) => {
        console.log(product)
        res.send(product);
        
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });
  
  // Delete product route 
  router.delete("/:productID", (req,res) => {
    // const userID = req.session.user_id; /// < ------ Uncomment this and delete next line when code is running with FrontEnd
    const userID = req.body.user_id;
    const productID = req.params.productID;
    deleteProduct(productID, db)
      .then(product => {
        res.send(product);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};