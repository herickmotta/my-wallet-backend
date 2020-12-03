const { createRegister, getRegistersByUserId } = require("../repositories/registerRepository");
const registerSchemas = require("../schemas/registerSchemas");


async function postRegister(req,res){
    const registerParams = req.body;

    const {error} = registerSchemas.register.validate(registerParams);
    if(error) return res.status(422).send({error: error.details[0].message});

    try{
        const register = await createRegister(registerParams);
        res.status(201).send(register);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

async function getUserRegisters(req,res){
    try{
        const registers = await getRegistersByUserId(req.user.id);
        return res.send(registers);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

module.exports = {
    postRegister,
    getUserRegisters
}