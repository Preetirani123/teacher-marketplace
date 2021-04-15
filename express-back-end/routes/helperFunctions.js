
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
    queryParams.push(categoryID);
    query += ` cat_id = $${queryParams.length}`;
  }
  if (name) {
    queryParams.push(name);
    query += ` name = $${queryParams.length}`;
  }
  if (description) {
    queryParams.push(description);
    query += ` description = $${queryParams.length}`;
  }
  if(price){
    queryParams.push(price);
    query += ` price = $${queryParams.length}`;
  }
  if(thumbnail_url){
    queryParams.push(thumbnail_url);
    query += ` thumbnail_url = $${queryParams.length}`;
  }
  if(subject_id){
    queryParams.push(subject_id);
    query += ` subject_id = $${queryParams.length}`;
  }
  if(grade){
    queryParams.push(grade);
    query += ` level_id = $${queryParams.length}`;
  }
  if(province){
    queryParams.push(province);
    query += ` province_id = $${queryParams.length}`;
  }

  queryParams.push(productID);
  query += ` WHERE id = $${queryParams.length} RETURNING *;`;


  return db.query(query, queryParams)
  .then(res => res.rows[0])
  .catch(err => {
    console.error('query error', err.stack);
  });
};

const deleteProduct = function(productID, db) {
  let query = `DELETE FROM product WHERE id = $1`;
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
  let query =   `INSERT INTO orders (cust_id, amount, purchased) VALUES ($1, $2, $3) RETURNING *`;
  const purchaseDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const values = [id, amount, purchaseDate];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
}

const addOrderDetails = function(o_id, p_id, qty, db) {
  let query =   `INSERT INTO order_details (order_id, prod_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
  const values = [o_id, p_id, qty];
  return db.query(query,values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
}

module.exports = {
  addUser,
  login,
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrder,
  addOrder,
  addOrderDetails
};
