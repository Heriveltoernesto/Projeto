const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function buscarJogosDoDia() {
  return [
    {
      time1: "Flamengo",
      time2: "Palmeiras",
      horario: "19:00",
      competicao: "Brasileirão Série A"
    },
    {
      time1: "São Paulo",
      time2: "Corinthians",
      horario: "21:30",
      competicao: "Copa do Brasil"
    }
  ];
}

app.get("/", (req, res) => {
  res.send("⚽ ArenaFutebolBR Backend Online!");
});

app.get("/jogos-hoje", (req, res) => {
  const jogos = buscarJogosDoDia();
  res.json(jogos);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});