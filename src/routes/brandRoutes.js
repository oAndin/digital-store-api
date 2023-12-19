const express = require('express');

const router = express.Router();

router.get('/brands', (req, res) => {
  return res.send('Lista de marcas')
});

router.get('/brands/:id', (req, res) => {
  return res.send('Lista uma marca')
});

router.post('/brands', (req, res) => {
  return res.send('Cria uma marca');
});
router.post('/brands/:id', (req, res) => {
  return res.send('Edita uma marca');
});

router.delete('/brands/:id', (req, res) => {
  return res.send('Deleta uma marca');
});

module.exports = router;