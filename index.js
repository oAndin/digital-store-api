const express = require('express');

const cors = require('cors');

const app = express();

const port = 8000;

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const brandRoutes = require('./src/routes/brandRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.get('/', (req, res) => {
  return res.send('Olá mundo!');
});

app.get('/docs', (req, res) => {
  return res.send('Documentação da aplicação');
});



app.use('/users', userRoutes);
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.send('Token necessário');
  }

  jwt.verify(req.headers.authorization.split(' ')[1], 'digital-store-api', (error) => {
    if (error) {
      return res.send('Token expirado');
    }
    next();
  })
});
app.use('/brands', brandRoutes);

app.all('*', (req, res) => {
  return res.send(JSON.stringify({
    type: 'error',
    message: 'Este endpoint não existe'
  }));
})
app.listen(port, () => {
  console.log(`Servidor de pé no link: http://localhost:${port}`);
})