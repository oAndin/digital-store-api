const DB = require('../database/index');

const tabela = 'brands';

async function listarTodos() {
  return await DB.execute(`SELECT * FROM ${tabela}`);
}

modelue.exports = {
  listarTodos
}