const connection = require('../database/index');

async function create(userParams) {
  const { name, email, password } = userParams;
  await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3);', [name, email, password]);

  const userData = await getUserDataByEmail(email);
  return userData;
}
async function findById(id) {
  console.log(id);
  const { rows } = await connection.query('SELECT * FROM users WHERE id = $1', [id]);
  if (rows.length) {
    return {
      id, name, email, balance,
    } = rows[0];
  } return false;
}

async function findByEmail(email) {
  const { rows } = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
  if (rows.length) {
    return rows[0];
  } return false;
}
async function getUserDataByEmail(email) {
  const user = await findByEmail(email);
  const { id, name, balance } = user;
  return {
    id, name, email, balance,
  };
}

module.exports = {
  create,
  findByEmail,
  getUserDataByEmail,
  findById,

};
