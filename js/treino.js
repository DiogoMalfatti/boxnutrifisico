    
    
    function toggleAcao() {
    
    if (botao.textContent === 'INICIAR') {
      iniciar();
      botao.textContent = 'PARAR';
      botao.classList.remove('iniciar');
      botao.classList.add('parar');
      botao.onclick = parar;
    } else {
      parar();
      botao.textContent = 'INICIAR';
      botao.classList.remove('parar');
      botao.classList.add('iniciar');
      botao.onclick = iniciar;
    }
    }
    async function iniciar() {
    await construindoConfiguracaoDoTreino()
    const dadosTreino = JSON.parse(localStorage.getItem("dadosTreino"));
    
    for (let i = 0; i < dadosTreino.quantidadeSecoes; i++) {
      const secoesElement = document.querySelector('.secoes');
      const secoesValorElement = secoesElement.querySelector('.secoes-valor');
      secoesElement.querySelector('.secoes-titulo').textContent = dadosTreino.quantidadeSecoes === 1 ? 'SEÇÃO' : 'SEÇÕES';
      secoesValorElement.textContent = `${formatarNumero(i + 1)}/${formatarNumero(dadosTreino.quantidadeSecoes)}`;
    
      audio321.play();
    
      await rodarExercicios(dadosTreino.exercicios);
    }
    resetaValores()
    }
    function formatarNumero(numero) {
    return numero.toString().padStart(2, '0');
    }
    
    
      function atualizarCronometro(segundos) {
        let minutos = Math.floor(segundos / 60); // calcula os minutos restantes
        let segundosStr = String(segundos % 60).padStart(2, "0"); // formata os segundos como string com dois dígitos
        let minutosStr = String(minutos).padStart(2, "0");
    
        let tempoStr = `${minutosStr}:${segundosStr}`; // cria a string de tempo no formato "mm:ss"
    
        document.querySelector(".tempo-principal").textContent = tempoStr; // atualiza o cronômetro na página
      }
    
    
    
      function rodarExercicios(arrayExercicios) {
        return new Promise((resolve, reject) => {
          let indiceExercicio = 0; // índice do exercício atual
    
          function executarProximoExercicio() {
            const exercicioAtual = arrayExercicios[indiceExercicio];
            const nomeExercicio = exercicioAtual.nome;
            const tempoExercicio = exercicioAtual.tempo;
    
            let segundosRestantes = tempoExercicio;
              
            const intervalId = setInterval(() => {
              segundosRestantes--;
              atualizarCronometro(segundosRestantes);
    
              if (segundosRestantes <= 0) {
    
                clearInterval(intervalId);
    
                indiceExercicio++;
    
                if (indiceExercicio < arrayExercicios.length) {
                  setTimeout(() => {
    
                    if (arrayExercicios[indiceExercicio].nome === "descanso") { 
                      atualizaQuandoDescanso(tempoExercicio)
                      audioDescansar.play();
                    } else {
                      atualizaQuandoExercicio(tempoExercicio)
                      audioExercicio.play();
                    }
    
                    executarProximoExercicio();
                  }, 1000);
                } else {
              
                  resolve();
                }
              }
            }, 1000);
          }
          executarProximoExercicio();
        });
      }
      function atualizaQuandoDescanso(segundos) {
    
    
        const minutosStr = numeroPadrao(segundos)
    
        nomePrincipal.innerHTML = 'DESCANSAR'
        nomePrincipal.style.color = 'white'
        tempoPrincipal.style.color = 'white'
        divPrincipal.style.backgroundColor = '#F93232'
    
        nomeSecundario.innerHTML = 'EXERCÍCIO'
        nomeSecundario.style.color = 'black'
        tempoSecundario.style.color = 'black'
        divSecundaria.style.backgroundColor = '#58CD2F'
        tempoSecundario.textContent = minutosStr
      }
      function atualizaQuandoExercicio(segundos) {
    
        const minutosStr = numeroPadrao(segundos)
    
    
        nomePrincipal.innerHTML = 'EXERCÍCIO'
        nomePrincipal.style.color = 'black'
        tempoPrincipal.style.color = 'black'
        divPrincipal.style.backgroundColor = '#58CD2F'
    
    
        nomeSecundario.innerHTML = 'DESCANSAR'
        nomeSecundario.style.color = 'white'
        tempoSecundario.style.color = 'white'
        divSecundaria.style.backgroundColor = '#F93232'
        tempoSecundario.textContent = minutosStr
      }
    
      function numeroPadrao(segundos) {
        let minutos = Math.floor(segundos / 60); // calcula os minutos restantes
        let segundosStr = String(segundos % 60).padStart(2, "0"); // formata os segundos como string com dois dígitos
        let minutosStr = String(minutos).padStart(2, "0");
    
        return `${minutosStr}:${segundosStr}`; // cria a string de tempo no formato "mm:ss"
      }
    
      function resetaValores() {
    /*     exercicioQuantidade = ''
        exercicioMinutos = "";
        exercicioSegundos = "";
        descansoMinutos = "";
        descansoSegundos = "";
        secoesQuantidade = ""; */
    
    
    
    
        nomePrincipal.innerHTML = 'EXERCÍCIO'
        nomePrincipal.style.color = 'black'
        tempoPrincipal.style.color = 'black'
        divPrincipal.style.backgroundColor = '#58CD2F'
    
        nomeSecundario.innerHTML = 'DESCANSAR'
        nomeSecundario.style.color = 'white'
        tempoSecundario.style.color = 'white'
        divSecundaria.style.backgroundColor = '#F93232'
        tempoSecundario.textContent = '00:00'
    
        botao.textContent = 'INICIAR';
        botao.classList.remove('parar');
        botao.classList.add('iniciar');
        botao.onclick = iniciar;
    
      }
      function parar() {
        location.reload();
      }
    