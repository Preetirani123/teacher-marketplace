const express = require("express");
const router = express.Router();
const { getProducts, insertProduct, updateProduct, deleteProduct, getProduct, indexOps } = require('./helperFunctions');


module.exports = (db, client) => {
  
  //get all products
  router.get("/", (req, res) => {
    getProducts(db)
      .then(products => res.send(products))
      .catch(e => {
        res.send(e);
      });
  });

  //Get a specific product
  router.get("/:productID", (req, res) => {
      const productID = req.params.productID;
      getProduct(productID, db)
        .then(products => res.send(products))
        .catch(e => {
          res.send(e);
        });
  });

  

  //creates a new product
  router.post("/", (req,res) => {
    // const userID = req.session.user_id; /// < ------ Uncomment this and delete next line when code is running.


    // client.indices.delete({
    //   index: '_all'
    // }, function(err, res) {
  
    //   if (err) {
    //       console.error(err.message);
    //   } else {
    //       console.log('Indexes have been deleted!');
    //   }
    // });

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