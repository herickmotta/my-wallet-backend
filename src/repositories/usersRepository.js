const connection = require('../database/index');

async function create(userParams){
    const {name,email,password} = userParams;
    await connection.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3);`,[name,email,password]);

    const userData = await getUserDataByEmail(email);
    return userData;
}

async function findByEmail(email){
    const result = connection.query(`SELECT * FROM users WHERE email = $1`,[email]);
    return result.rows[0];
}

async function getUserDataByEmail(email){
    const user = findByEmail(email);
    const {id,name,email} = user;
    return {id,name,email};
}

module.exports = {
    create,
    findByEmail,
    getUserDataByEmail
}