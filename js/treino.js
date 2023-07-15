const exericios = [];
const configuracoes = {
  quantidadeSecoes: null,
  tempoExercicio: null,
  tempoDescanso: null,
};

function criandoElemento(value, classe) {
  if (classe === "sessao") {
    configuracoes.quantidadeSecoes = parseInt(value);
  }
  if (classe === "exercicio") {
    configuracoes.tempoExercicio = parseInt(value);
  }
  if (classe === "descanso") {
    configuracoes.tempoDescanso = parseInt(value);
  }
  document.querySelector(`.${classe}`).innerHTML = value;
}
function iniciarExercicio() {
  configuracoes.exercicios = exercicios;
  const dadosTreino = configuracoes;
  console.log(dadosTreino);
  localStorage.setItem("dadosTreino", JSON.stringify(dadosTreino));
  window.location.href = "telaTreino.html";
}

let exercicios = [];

function atualizarListaExercicios() {
  const lista = document.querySelector(".listaExercicios");
  lista.innerHTML = exercicios
    .map((item) => {
      return `<li class="my-2 d-flex justify-content-between">${item.exercicio}<span class="btn btn-danger btn-sm remover" onclick="removerExercicio(${item.id})">x</span></li>`;
    })
    .join("");
}

function adicionarExercicio(texto) {
  const novoItem = {
    exercicio: texto,
    id: exercicios.length,
  };
  exercicios.push(novoItem);
  atualizarListaExercicios();
}

function removerExercicio(id) {
  exercicios = exercicios.filter((item) => item.id !== id);
  atualizarListaExercicios();
}
