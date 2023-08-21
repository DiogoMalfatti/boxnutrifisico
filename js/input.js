let botao = document.getElementById("botao");
function valoresIniciais() {
  passandoParseInt();
  secoesElement.querySelector(".secoes-titulo").textContent =
    secoesQuantidade === 1 ? "SEÇÃO" : "SEÇÕES";
  secoesValorElement.textContent = `01/${formatarNumero(secoesQuantidade)}`;

  atualizarCronometro(
    exercicioMinutos * 60 + exercicioSegundos,
    ".tempo-principal"
  );
  atualizarCronometro(
    descansoMinutos * 60 + descansoSegundos,
    ".tempo-secundario"
  );
}

function verificarValoresCampos() {
  validacao = true;

  if (
    exercicioMinutos.length !== 2 ||
    exercicioSegundos.length !== 2 ||
    descansoMinutos.length !== 2 ||
    descansoSegundos.length !== 2 ||
    entreSecoesTempoMinutos.length !== 2 ||
    entreSecoesTempoSegundos.length !== 2 ||
    (exercicioQuantidade.length !== 1 && exercicioQuantidade.length !== 2) ||
    (secoesQuantidade.length !== 1 && secoesQuantidade.length !== 2) ||
    parseInt(exercicioQuantidade) < 1 ||
    parseInt(secoesQuantidade) < 1
  ) {
    botao.setAttribute("disabled", true);
    validacao = false;
    return;
  }
  validacao = true;
  valoresIniciais();
  botao.removeAttribute("disabled"); // Ativa o botão se as validações forem verdadeiras
}

let timeInputs = document.querySelectorAll(".timeInput");

timeInputs.forEach((input) => {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, ""); // Remove caracteres não-dígitos

    if (this.value.length > 4) {
      this.value = this.value.slice(0, 4); // Limita a 4 caracteres
    }

    if (/^\d{4}$/.test(this.value)) {
      const minutes = this.value.substring(0, 2);
      const seconds = this.value.substring(2, 4);
      this.value = `${minutes}:${seconds}`;
      updateVariables(); // Chama a função para atualizar as variáveis
    }
    verificarValoresCampos(); // Verifica as regras toda vez que algo é digitado
  });
});

const quantityInputs = document.querySelectorAll(".quantityInput");

quantityInputs.forEach((input) => {
  input.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, ""); // Remove caracteres não-dígitos

    if (this.value.length > 2) {
      this.value = this.value.slice(0, 2); // Limita a 2 caracteres
    }
    updateVariables(); // Chama a função para atualizar as variáveis
    verificarValoresCampos(); // Verifica as regras toda vez que algo é digitado
  });
});

function updateVariables() {
  exercicioMinutos = document
    .getElementById("exerciseTime")
    .value.substring(0, 2);
  exercicioSegundos = document
    .getElementById("exerciseTime")
    .value.substring(3, 5);
  descansoMinutos = document.getElementById("restTime").value.substring(0, 2);
  descansoSegundos = document.getElementById("restTime").value.substring(3, 5);
  exercicioQuantidade = document.getElementById("quantity-exercise").value;
  secoesQuantidade = document.getElementById("quantity-sections").value;

  entreSecoesTempoMinutos = document
    .getElementById("tempo-entre-secoes")
    .value.substring(0, 2);
  entreSecoesTempoSegundos = document
    .getElementById("tempo-entre-secoes")
    .value.substring(3, 5);
}
function passandoParseInt() {
  exercicioQuantidade = parseInt(exercicioQuantidade);
  exercicioMinutos = parseInt(exercicioMinutos);
  exercicioSegundos = parseInt(exercicioSegundos);
  descansoMinutos = parseInt(descansoMinutos);
  descansoSegundos = parseInt(descansoSegundos);
  secoesQuantidade = parseInt(secoesQuantidade);
  entreSecoesTempoMinutos = parseInt(entreSecoesTempoMinutos);
  entreSecoesTempoSegundos = parseInt(entreSecoesTempoSegundos);
}

function construindoConfiguracaoDoTreino() {
  passandoParseInt();
  const totalTempoExercicio = exercicioMinutos * 60 + exercicioSegundos;
  const totalTempoDescanso = descansoMinutos * 60 + descansoSegundos;
  const tempoEntreSecoes =
    entreSecoesTempoMinutos * 60 + entreSecoesTempoSegundos;
  const configuracoes = {
    quantidadeSecoes: secoesQuantidade,
    tempoExercicio: totalTempoExercicio,
    tempoDescanso: totalTempoDescanso,
    tempoEntreSecoes: tempoEntreSecoes,
  };

  let exercicios = [];
  for (let i = 1; i <= exercicioQuantidade; i++) {
    exercicios.push(adicionarExercicio(i, configuracoes));
    if (i < exercicioQuantidade) {
      exercicios.push(adicionarDescanso(i, configuracoes));
    }
  }

  configuracoes.exercicios = exercicios;
  setDadosTreino = configuracoes;
  localStorage.setItem("dadosTreino", JSON.stringify(setDadosTreino));
}

function adicionarExercicio(index, configuracoes) {
  const novoExercicio = {
    id: index,
    nome: `Exercicio - ${index}`,
    tempo: configuracoes.tempoExercicio,
  };
  return novoExercicio;
}

function adicionarDescanso(index, configuracoes) {
  const descanso = {
    nome: "descanso",
    tempo: configuracoes.tempoDescanso,
  };
  return descanso;
}
