const express = require('express');

const cors = require('cors');

const app = express();

const port = 8000;

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

app.use('/brands', brandRoutes);
app.use('/users', userRoutes);

app.all('*', (req, res) => {
  return res.send(JSON.stringify({
    type: 'error',
    message: 'Este endpoint não existe'
  }));
})
app.listen(port, () => {
  console.log(`Servidor de pé no link: http://localhost:${port}`);
})