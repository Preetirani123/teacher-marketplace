
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


const insertProduct = function(userID, categoryID, description, price, thumbnail_url, subject_id, grade, province, db) {
  const query = `
		INSERT INTO product (cat_id, owner_id, description, price, thumbnail_url, subject_id, level_id, province_id)
  	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  	RETURNING *;`;
  const values = [categoryID, userID, description, price, thumbnail_url, subject_id, grade, province];
  return db.query(query, values)
    .then(res => res.rows[0])
    .catch(err => {
      console.error('query error', err.stack);
    });
};

const updateProduct = function(userID, categoryID, description, price, thumbnail_url, subject_id, grade, province, db) {

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



module.exports = {
  addUser,
  login,
  getProducts,
  insertProduct,
  updateProduct,
  deleteProduct
};
