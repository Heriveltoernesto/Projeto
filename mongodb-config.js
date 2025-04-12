// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/arena', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const JogoSchema = new mongoose.Schema({
  id: Number,
  data: Object
});
const Jogo = mongoose.model('Jogo', JogoSchema);

// Rota básica
app.get('/', (req, res) => {
  res.send('Arena Futebol BR API rodando!');
});

// Rota para retornar jogos
app.get('/jogos', async (req, res) => {
  const jogos = await Jogo.find();
  res.json(jogos);
});

// Cron para atualizar dados da API a cada 15 segundos
cron.schedule('*/15 * * * * *', async () => {
  console.log('⏱️ Atualizando dados...');
  try {
    const response = await axios.get('https://v3.football.api-sports.io/fixtures?live=all', {
      headers: {
        'x-apisports-key': '78a0a0aae6dcc0392dfb5e33f9021b5b'
      }
    });

    const dados = response.data.response;
    await Jogo.deleteMany();
    await Jogo.insertMany(dados.map((jogo, i) => ({ id: i, data: jogo })));

    const firestoreBatch = db.batch();
    dados.forEach((jogo, i) => {
      const docRef = db.collection('jogos').doc(i.toString());
      firestoreBatch.set(docRef, jogo);
    });
    await firestoreBatch.commit();

    console.log('✅ Dados atualizados com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar os dados:', error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando na porta ${PORT}`);
});

// frontend/index.html
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Arena Futebol BR</title>
    <style>
      body { font-family: Arial; background: #111; color: white; margin: 0; padding: 2rem; }
      .jogo { border: 1px solid #444; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; background: #222; }
      .time { font-size: 1.2rem; font-weight: bold; }
      .placar { font-size: 1.5rem; margin: 0.5rem 0; }
    </style>
  </head>
  <body>
    <h1>⚽ Arena Futebol BR</h1>
    <div id="jogos"></div>
    <script>
      async function buscarJogos() {
        const res = await fetch('http://localhost:3000/jogos');
        const data = await res.json();
        const container = document.getElementById('jogos');
        container.innerHTML = '';
        data.forEach(({ data }) => {
          const div = document.createElement('div');
          div.className = 'jogo';
          div.innerHTML = `
            <div class="time">${data.teams.home.name} vs ${data.teams.away.name}</div>
            <div class="placar">${data.goals.home} - ${data.goals.away}</div>
            <div>Status: ${data.fixture.status.long}</div>
          `;
          container.appendChild(div);
        });
      }
      setInterval(buscarJogos, 10000);
      buscarJogos();
    </script>
  </body>
</html>

// firebase-key.json
// (insira sua chave privada do Firebase aqui para autenticação com Firestore)

// package.json
{
  "name": "arena-futebol-br",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "firebase-admin": "^11.5.0",
    "mongoose": "^7.0.3",
    "node-cron": "^3.0.2"
  }
}
