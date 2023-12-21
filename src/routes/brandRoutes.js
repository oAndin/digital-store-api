const express = require('express');
const controller = require('../controllers/brandController.js');
const DB = require('../database/index');

const router = express.Router();

router.get('/', async (req, res) => {
  return res.send(await controller.listarTodos())
});

router.get('/:id', (req, res) => {
  return res.send(`Lista uma marca: ${req.params.id}`)
});

router.post('/', (req, res) => {
  return res.send(`Cria uma marca: ${req.body}`);
});
router.post('/:id', (req, res) => {
  return res.send('Edita uma marca');
});

router.delete('/:id', (req, res) => {
  return res.send('Deleta uma marca');
});

module.exports = router;