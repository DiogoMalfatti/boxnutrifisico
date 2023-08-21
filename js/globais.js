audio321 = new Audio("./audios/audio321.mp3");
audioDescansar = new Audio("./audios/audioDescansar.mp3");
audioExercicio = new Audio("./audios/audioExercicio.mp3");

let setDadosTreino = null;
let validations = false; // Começa como falso
let exercicioQuantidade = "";
let exercicioMinutos = "";
let exercicioSegundos = "";
let descansoMinutos = "";
let descansoSegundos = "";
let secoesQuantidade = "";
let disabled = false;
let nomePrincipal = document.querySelector(".nome-principal");
let tempoPrincipal = document.querySelector(".tempo-principal");
let divPrincipal = document.querySelector(".principal");

let nomeSecundario = document.querySelector(".nome-secundario");
let tempoSecundario = document.querySelector(".tempo-secundario");
let divSecundaria = document.querySelector(".secundario");
let secoesElement = document.querySelector(".secoes");
let secoesValorElement = secoesElement.querySelector(".secoes-valor");
