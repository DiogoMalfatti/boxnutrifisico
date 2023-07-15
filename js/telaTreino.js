function voltar() {
  window.location.href = "/boxnutrifisico/treinos.html";
}
// Obter dados do armazenamento local
const dadosTreino = JSON.parse(localStorage.getItem("dadosTreino"));

function criandoLista() {
  const exerciciosList = dadosTreino.exercicios;
  const novoArrayExercicios = [];

  // Loop pelos exercícios
  for (let i = 0; i < exerciciosList.length; i++) {
    // Adiciona o exercício atual
    novoArrayExercicios.push({
      nome: exerciciosList[i].exercicio,
      id: exerciciosList[i].id,
      tempo: parseInt(dadosTreino.tempoExercicio),
    });

    // Adiciona o descanso após o exercício, exceto no último
    if (i < exerciciosList.length - 1) {
      novoArrayExercicios.push({
        nome: "descanso",
        tempo: parseInt(dadosTreino.tempoDescanso),
      });
    }
  }
  return novoArrayExercicios;
}

const novoArrayExercicios = criandoLista();

function adicionarNomes(exercicios) {
  const listaExercicios = document.querySelector(".lista-exercicios");
  for (let i = 0; i < exercicios.length; i++) {
    const nomeExercicio = exercicios[i].nome;
    const divExercicio = document.createElement("div");
    divExercicio.className = "exercicio";
    const h2 = document.createElement("h2");
    h2.textContent = nomeExercicio;
    divExercicio.appendChild(h2);
    listaExercicios.appendChild(divExercicio);
  }
}
adicionarNomes(novoArrayExercicios);

audio321 = new Audio("./audios/audio321.mp3");
audioDescansar = new Audio("./audios/audioDescansar.mp3");
audioExercicio = new Audio("./audios/audioExercicio.mp3");

function atualizarCronometro(segundos) {
  console.log("segundos atualizarCronometro", segundos);
  let minutos = Math.floor(segundos / 60); // calcula os minutos restantes

  let segundosStr = String(segundos % 60).padStart(2, "0"); // formata os segundos como string

  let tempoStr = `00:${segundosStr}`; // cria a string de tempo no formato "mm:ss"
  document.querySelector(".digitos").textContent = tempoStr; // atualiza o cronômetro na página
}

function rodarExercicios(arrayExercicios) {
  return new Promise((resolve, reject) => {
    let indiceExercicio = 0; // índice do exercício atual

    function executarProximoExercicio() {
      const exercicioAtual = arrayExercicios[indiceExercicio];
      const nomeExercicio = exercicioAtual.nome;
      const tempoExercicio = exercicioAtual.tempo;
      let segundosRestantes = tempoExercicio;

      console.log(`Iniciando ${nomeExercicio} por ${tempoExercicio} segundos`);

      const intervalId = setInterval(() => {
        segundosRestantes--;
        atualizarCronometro(segundosRestantes);

        if (segundosRestantes <= 0) {
          console.log(`Finalizando ${nomeExercicio}`);
          clearInterval(intervalId);

          const h2s = document.querySelectorAll(
            ".lista-exercicios .exercicio h2"
          );
          const h2Atual = h2s[indiceExercicio];

          h2Atual.classList.remove("exercicio-andamento");
          h2Atual.classList.add("exercicio-concluido");

          indiceExercicio++;

          if (indiceExercicio < arrayExercicios.length) {
            setTimeout(() => {
              const h2s = document.querySelectorAll(
                ".lista-exercicios .exercicio h2"
              );
              const h2Atual = h2s[indiceExercicio];

              h2Atual.classList.add("exercicio-andamento");

              if (arrayExercicios[indiceExercicio].nome === "descanso") {
                audioDescansar.play();
              } else {
                audioExercicio.play();
              }

              executarProximoExercicio();
            }, 1000);
          } else {
            console.log("Exercícios finalizados");
            resolve();
          }
        }
      }, 1000);

      const h2s = document.querySelectorAll(".lista-exercicios .exercicio h2");
      const h2Atual = h2s[indiceExercicio];

      h2Atual.classList.add("exercicio-andamento");
    }
    executarProximoExercicio();
  });
}

async function iniciar() {
  // Esconder botão Iniciar e mostrar botão Parar
  document.querySelector(".iniciar").style.display = "none";
  document.querySelector(".parar").style.display = "block";
  document.querySelector(".parar").classList.remove("btn-danger");
  document.querySelector(".parar").classList.add("btn-warning");
  document.querySelector(".parar").innerHTML = "PARAR";

  for (let i = 0; i < dadosTreino.quantidadeSecoes; i++) {
    document.querySelector(".secoes").innerHTML = `Seções - ${i + 1}/${
      dadosTreino.quantidadeSecoes
    }`;
    console.log(`Iniciando seção ${i + 1}`);
    audio321.play();

    resetarClasseElementos();
    await rodarExercicios(novoArrayExercicios);
  }
  resetarClasseElementos();
  document.querySelector(".secoes").innerHTML = "";
  // Esconder botão Parar e mostrar botão Iniciar
  document.querySelector(".parar").style.display = "none";
  document.querySelector(".iniciar").style.display = "block";
}
function resetarClasseElementos() {
  // seleciona todos os elementos com a classe 'sua-classe'
  const elementos = document.querySelectorAll(".exercicio-concluido");

  // percorre todos os elementos selecionados e remove a classe 'sua-classe'
  elementos.forEach(function (elemento) {
    elemento.classList.remove("exercicio-concluido");
  });
}
function parar() {
  location.reload();
}
