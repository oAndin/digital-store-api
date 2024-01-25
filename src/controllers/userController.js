
const DB = require('../database/index');

const tabela = 'users';

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');


async function listAll() {
  return await DB.execute(`SELECT user_id, user_name, user_email FROM ${tabela};`);
}

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
    const existeUsuario = await DB.execute(`SELECT * FROM users WHERE user_email = '${data.user_email}';`);
    if (existeUsuario.length > 0) {
      throw new Error('E-mail já cadastrado!');
    }

    bcrypt.hash(data.user_password, 10, async (error, hash) => {
      if (error) {
        return hash;
      }

      await DB.execute(`INSERT INTO ${tabela} (user_name, user_email, user_password) VALUES ('${data.user_name}' , '${data.user_email}' , '${hash}');`);

    })
    return {
      message: 'Usuário criado com sucesso'
    }
  } catch (error) {
    return {
      message: error.message
    }
  }


};

async function login(data) {
  try {
    if (!data.user_email || data.user_email === '') {
      throw new Error('Email obrigatório');
    }

    if (!data.user_password || data.user_password === '') {
      throw new Error('Senha obrigatória');
    }

    const result = await DB.execute(`SELECT * FROM ${tabela} WHERE user_email = '${data.user_email}';`);

    if (result.length === 0) {
      return {
        message: 'Email ou senha incorretos'
      }
    }

    const response = await bcrypt.compare(data.user_password, result[0].user_password);
    if (response) {
      const token = jwt.sign({ user_id: result[0].user_id }, 'digital-store-api', {
        expiresIn: '1h'
      });

      await DB.execute(`UPDATE ${tabela} SET token = '${token}' WHERE user_id = ${result[0].user_id};`);
      return token;
    }
    return {
      message: 'Email ou senha incorretos'
    }

  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function destroy(id) {
  try {

    await DB.execute(`DELETE FROM ${tabela} WHERE user_id = ${id};`);
    return {
      type: 'sucess',
      message: 'Usuário delete com sucesso!'
    }

  } catch (error) {
    return {
      type: 'error',
      message: error.message
    }
  }
}

async function update(id) {
  try {
    
  } catch (error) {
    return {
      type: 'error',
      message: error.message
    }
  }
}

module.exports = {
  create,
  listAll,
  destroy,
  login,
};