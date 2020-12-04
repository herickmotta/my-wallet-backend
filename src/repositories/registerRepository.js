
const connection = require("../database");

async function createRegister(registerParams) {
    const {value,description,type,user_id} = registerParams;
    await connection.query('INSERT INTO registers (user_id,description,value,type) VALUES ($1,$2,$3,$4);',[user_id,description,value,type]);

    await updateUserBalance(user_id,type,value);

    const register = await connection.query('SELECT * FROM registers WHERE id=(SELECT max(id) FROM registers);')

    return register.rows[0];

}
async function updateUserBalance(user_id,type,value){
    const {rows} = await connection.query('SELECT balance FROM users WHERE id=$1;',[user_id]);
    console.log(rows);
    const newBalance = type === 'output' ? parseFloat(rows[0].balance) - parseFloat(value) : parseFloat(rows[0].balance)+ parseFloat(value);
    await connection.query('UPDATE users SET balance=$1 WHERE id=$2;',[newBalance,user_id]);
}

async function getRegistersByUserId(user_id) {
  const {rows} = await connection.query(`SELECT * FROM registers WHERE user_id=$1;`,[user_id]);
  return rows;
}

async function destroyById(regId) {
  await connection.query(`DELETE FROM registers WHERE id=$1;`,[regId]);

}

async function Whipe(){
    await connection.query(`DELETE FROM registers;`);
}



module.exports = {createRegister,getRegistersByUserId,destroyById}

