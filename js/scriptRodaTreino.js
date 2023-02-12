// (() => {
// })();

// let count = 1;
// let counterInterval = setInterval(function () {
//   count--;
//   if (count === 0) {
//     clearInterval(counterInterval);
//     // coloca aqui
//   }
// }, 1000);

document.getElementById("start-button").addEventListener("click", rodarTreino);

function rodarTreino() {
  vaiComeçar();
  setTimeout(contagemRegressiva, 250);
}

function vaiComeçar() {
  document.getElementById("vaiComeçar").innerHTML = "Vai começar em :";
}

function contagemRegressiva() {
  let count = 4;
  let counterInterval = setInterval(function () {
    count--;
    document.getElementById("tempoComeçar").innerHTML = count;
    if (count === 0) {
      clearInterval(counterInterval);
      começou();
    }
  }, 1000);
}

function começou() {
  document.getElementById("começou").innerHTML = "Exercício !";
  setTimeout(tempoDeExercicio, 1000);
}

function tempoDeExercicio() {
  let count = 0;
  let counterInterval = setInterval(function () {
    count++;
    document.getElementById("tempoExercicio").innerHTML =
      "Tempo de exercício: " + count;
    if (count === 10) {
      clearInterval(counterInterval);
      descanso();
    }
  }, 1000);
}

function descanso() {
  document.getElementById("descanso").innerHTML = "Descanso !";
  let count = 10;
  let counterInterval = setInterval(function () {
    count--;
    document.getElementById("tempoDescanso").innerHTML =
      "Tempo de descanso: " + count;
    if (count === 0) {
      clearInterval(counterInterval);
      tempoDeInicio();
    }
  }, 1000);
}
