
// Inserts new user into database
const addUser = function(user, db) {
  let query = `
		INSERT into users (name, email, password)
  	VALUES ($1, $2, $3)
		RETURNING *`;
  const values = [user.name, user.email, user.password];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};

// Log in user
const login = function(email, password, db) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const value = [email || 'null'];
  return db.query(query, value)
    .then(res => res.rows[0])
    .then(res => {
      if (res !== undefined && (password === res.password)) { // If we want to add bcrypt
        return res;
      }
      return null;
    })
    .catch((err, res) => res.send(err));
};

// gets a users info
const getUserInfo = function(id, db) {
  const query = `SELECT * FROM users WHERE id = $1`;
  const value = [id];
  return db.query(query, value)
  .then(res => res.rows[0])
  .catch((err, res) => res.send(err));
};

//Gets all the products in the DB
const getProducts = function(db) {
  const query = `SELECT * FROM product`
  return db.query(query)
    .then(res => res.rows)// returns an array of objects of objs (JSON FORMAT)
    .catch((err, res) => res.send(err));
}

//Gets a product in the DB
const getProduct = function(productID, db) {
  console.log('product id', productID)
  const query = `SELECT * FROM product WHERE id = $1`
  const value = [productID];
  return db.query(query, value)
    .then(res => res.rows)// returns an array of objects of objs (JSON FORMAT)
    .catch((err, res) => res.send(err));
}


const insertProduct = function(userID, name, categoryID, description, price, thumbnail_url, subject_id, grade, province, db) {
  const query = `
		INSERT INTO product (cat_id, name, owner_id, description, price, thumbnail_url, subject_id, level_id, province_id)
  	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  	RETURNING *;`;
  const values = [categoryID, name, userID, description, price, thumbnail_url, subject_id, grade, province];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};

const updateProduct = function(productID, name, categoryID, description, price, thumbnail_url, subject_id, grade, province, db) {
  
  let query = `UPDATE product SET`;
  const queryParams = [];

  if (categoryID) {
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(categoryID);
    query += ` cat_id = $${queryParams.length}`;
  }
  if (name) {
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(name);
    query += ` name = $${queryParams.length}`;
  }
  if (description) {
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(description);
    query += ` description = $${queryParams.length}`;
  }
  if(price){
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(price);
    query += ` price = $${queryParams.length}`;
  }
  if(thumbnail_url){
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(thumbnail_url);
    query += ` thumbnail_url = $${queryParams.length}`;
  }
  if(subject_id){
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(subject_id);
    query += ` subject_id = $${queryParams.length}`;
  }
  if(grade){
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(grade);
    query += ` level_id = $${queryParams.length}`;
  }
  if(province){
    if (queryParams.length !== 0){
      query += ',';
    }
    queryParams.push(province);
    query += ` province_id = $${queryParams.length}`;
  }

  queryParams.push(productID);
  query += ` WHERE id = $${queryParams.length} RETURNING *;`;


  return db.query(query, queryParams)
  .then(res => {
    console.log(query)
    console.log("debug----------------------------")
    return res.rows[0]
  })
  .catch(err => {
    console.error('query error', err.stack);
  });
};

const deleteProduct = function(productID, db) {
  let query = `DELETE FROM product WHERE id = $1 RETURNING *`;
  const values = [productID];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};


const getOrders = function(db) {
  const query = `SELECT * FROM orders`
  return db.query(query)
    .then(res => res.rows)// returns an array of objects of objs (JSON FORMAT)
    .catch((err, res) => res.send(err));
}

const getOrder = function(orderID, db) {
  const query = `SELECT * FROM orders WHERE id = $1`
  const value = [orderID];
  return db.query(query, value)
    .then(res => res.rows)// returns an array of objects of objs (JSON FORMAT)
    .catch((err, res) => res.send(err));
}

const addOrder = function(amount, id, db) {
  let query = `INSERT INTO orders (cust_id, amount, purchased) VALUES ($1, $2, $3) RETURNING *`;
  const purchaseDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const values = [id, amount, purchaseDate];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
}

const getAllOrdersByUserID = (id, db) => {
  let query = 'SELECT * FROM orders WHERE cust_id = $1';
  const values = [id];
  return db.query(query, values)
  .then(res => res.rows)
  .catch(err => {
    console.error('query error', err.stack);
  });
}

const getAllOrderDetails = function(db) {
  const query = `SELECT * FROM order_details`
  return db.query(query)
    .then(res => res.rows)// returns an array of objects of objs (JSON FORMAT)
    .catch((err, res) => res.send(err));
}

const getOrderDetailsByID = function(orderID, db) {
  const query = 'SELECT * FROM order_details WHERE order_id = $1'
  const values = [orderID];
  return db.query(query, values)
  .then((res) => res.rows)
  .catch((e) => console.log(e))
}


const addOrderDetails = function(o_id, p_id, price, qty, db) {
  let query = `INSERT INTO order_details (order_id, prod_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [o_id, p_id, price, qty];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
}

const getProdsByUser = function (u_id, db) {
  let query = `SELECT * FROM product WHERE owner_id = $1;`
  const values = [u_id]
  return db.query(query, values)
  .then((res) => res.rows)
  .catch((e) => console.log(e))
}

const getCats = function(db) {
  let query =   `SELECT * FROM category`;
  return db.query(query)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
}

const getSubj = function(db) {
  let query =   `SELECT * FROM subject`;
  return db.query(query)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
}

const getLevs = function(db) {
  let query =   `SELECT * FROM level`;
  return db.query(query)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
}

const getProv = function(db) {
  let query =   `SELECT * FROM province`;
  return db.query(query)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
}



//Gets all the products in the DB
const indexOps = function(db) {
  const query = `SELECT * FROM product`
  return db.query(query)
    .then(res => res.rows)// returns an array of objects of objs (JSON FORMAT)
    .catch((err, res) => res.send(err));
}

const getLastOrderID = function (customer_ID, db) {
  let query = `SELECT id FROM orders WHERE cust_id=$1 ORDER BY id DESC LIMIT 1`;
  const values = [customer_ID];
  return db.query(query, values)
    .then((res) => res.rows[0])
    .catch((err) => {
      console.error("query error", err.stack);
    });
};

const getProductsByFilters = function (conds, db) {
  let query = `SELECT * FROM product`;
  let pR = `WHERE price ${Number(conds.pRange) === 1 ? 'BETWEEN 0 AND 50' : Number(conds.pRange) === 2 ?
  'BETWEEN 51 AND 100' : Number(conds.pRange) === 3 ? 'BETWEEN 101 AND 150' : '> 151'};`
  query += pR
  console.log(query)

}

const addSearch = function(u_id, em, sch, db) {
  let query = `INSERT INTO search (user_id, email, searchterms) VALUES ($1, $2, $3) RETURNING *`;
  const values = [u_id, em, sch];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
}


const getSearch = function (u_id, db) {
  let query = `SELECT searchterms FROM search WHERE user_id = $1`;
  const values = [u_id];
  return db.query(query,values)
    .then(res => res.rows)
    .catch(err => {
      console.error('query error', err.stack);
    });
}



module.exports = {
  addUser,
  login,
  getProducts,
  getProduct,
  getUserInfo,
  insertProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrder,
  addOrder,
  addOrderDetails,
  getProdsByUser,
  getCats,
  getLevs,
  getProv,
  getSubj,
  getAllOrderDetails,
  indexOps,
  getAllOrdersByUserID,
  getOrderDetailsByID,
  getLastOrderID,
  getProductsByFilters,
  addSearch,
  getSearch

};
