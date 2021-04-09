
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


module.exports = {
  addUser,
  login
};
