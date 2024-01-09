
const DB = require('../database/index');

const tabela = 'users';

const jwt = require('jsonwebtoken');


async function create(data) {
  try {
    if (!data.user_name || data.user_name === '') {
      throw new Error('Nome de usuário é obrigatório!')
    }
    if (!data.user_email || data.user_email === '') {
      throw new Error('E-mail de usuário é obrigatório!')
    }
    if (!data.user_password || data.user_password === '') {
      throw new Error('Senha de usuário é obrigatório!')
    }
    // Codigo 
    const existeUsuario = await DB.execute(`SELECT * FROM users WHERE user_email = '${data.user_email}';`);
    if (existeUsuario.length > 0) {
      throw new Error('E-mail já cadastrado!');
    }
  }
  catch (error) {
    return {
      message: error.message
    }
  }
  await DB.execute(`INSERT INTO ${tabela} (user_name, user_email, user_password) VALUES ('${data.user_name}' , '${data.user_email}' , '${data.user_passowrd}' );`);
  return {
    message: 'Usuário criado com sucesso'
  }
  // return await DB.insertInto(tabela, data);
};

async function login(data) {
  try {
    if (!data.user_email || data.user_email === '') {
      throw new Error("O e-mail é necessário");
    }
    if (!data.user_password || data.user_password === '') {
      throw new Error("A senha é necessário");
    }
    const result = await DB.execute(`SELECT * FROM ${tabela} WHERE user_email = '${data.user_email}' AND user_password = '${data.user_passowrd}';`);

    if (result.length == 0) {
      return {
        message: 'E-mail ou senha incorretos'
      }
    }

    const token = jwt.sign({ user_id: result[0].user_id },
      'digital-store-ap', {
      expiresIn: "1h"
    });
    await DB.execute(`UPDATE ${tabela} SET token = '${token}' WHERE user_id = ${result[0].user_id};`)
    return {
      token
    }
  }
  catch (error) {
    return {
      message: error.message
    };
  };
};

module.exports = {
  create,
  login
};