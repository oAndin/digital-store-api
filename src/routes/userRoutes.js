const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.post('/', async (req, res) => {
  return res.send(await controller.create(req.body));
});

router.post('/login', async (req, res) => {
  return res.send(await controller.login(req.body));
});

module.exports = router;