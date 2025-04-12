// app.js

document.addEventListener("DOMContentLoaded", function() {
  const resultadosDiv = document.getElementById('resultados');
  const memoriasDiv = document.getElementById('memorias');
  const loadMemoriasButton = document.getElementById('loadMemorias');

  // Função que simula a obtenção de resultados de jogos
  function carregarResultados() {
    const resultados = [
      "Futebol: Time A 3 x 1 Time B",
      "Futebol: Time C 0 x 2 Time D",
      "Futebol: Time E 1 x 1 Time F"
    ];

    resultadosDiv.innerHTML = resultados.map(resultado => `<p>${resultado}</p>`).join("");
  }

  // Função que simula a obtenção de memórias históricas do futebol
  function carregarMemorias() {
    const memorias = [
      "A primeira Copa do Mundo foi em 1930 no Uruguai.",
      "Pelé é considerado o maior jogador de futebol de todos os tempos.",
      "A final da Copa de 1998 teve um grande impacto no futebol brasileiro."
    ];

    memoriasDiv.innerHTML = memorias.map(memoria => `<p>${memoria}</p>`).join("");
  }

  // Carregar resultados assim que a página carregar
  carregarResultados();

  // Adicionar funcionalidade ao botão para carregar memórias
  loadMemoriasButton.addEventListener('click', function() {
    carregarMemorias();
  });
});
