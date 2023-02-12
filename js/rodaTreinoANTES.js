document.getElementById("start-button").addEventListener("click", rodarTreino);

function rodarTreino() {
  console.log("Função rodarTreino foi clicada!");

  let count = 10;
  let start = Date.now();

  let counterInterval = setTimeout(function tick() {
    let elapsed = Math.round((Date.now() - start) / 100) / 10;
    let remaining = count - elapsed;

    let segundos = Math.floor(remaining);
    let milissegundos = Math.floor((remaining - segundos) * 100);

    segundos = segundos < 10 ? "0" + segundos : segundos;
    milissegundos = milissegundos < 10 ? "0" + milissegundos : milissegundos;

    document.getElementById("counter").innerHTML =
      segundos + " segundos : " + milissegundos + " milissegundos";
    if (remaining > 0) {
      setTimeout(tick, 10);
    } else {
      document.getElementById("alerta").innerHTML = "Tempo esgotado!";
    }
  }, 10);
}
