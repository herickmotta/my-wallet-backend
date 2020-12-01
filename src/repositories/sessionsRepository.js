const { v4: uuidv4 } = require("uuid");
const connection = require("../database");

async function createByUserId(userId) {
  const token = uuidv4();
  await connection.query(`INSERT INTO sessions ("userId",token) VALUES ($1,$2)`,[userId,token])
  return {userId,token};
}

async function findByToken(token) {
  const {rows} = await connection.query(`SELECT * FROM sessions WHERE token=$1`,[token]);
  return rows[0];
}

async function destroyByUserId(userId) {
  await connection.query(`DELETE FROM sessions WHERE userId=$1`,[userId]);
}

module.exports = { createByUserId, findByToken, destroyByUserId };
