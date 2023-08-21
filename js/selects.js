/* function selectQuantidadeDeExercicios() {
    const selectElement = document.getElementById('quantity-exercise');

    for (let i = 1; i <= 60; i++) {
      const option = document.createElement('option');
      option.value = i.toString(); // Não adiciona o zero à esquerda nos values das options
      option.textContent = i.toString(); // Não adiciona o zero à esquerda no texto das options
      selectElement.appendChild(option);
    }

    selectElement.value = '1'; // Mantém o valor "1" como padrão
  }

  // Função para criar os options de 0 a 59 minutos
  function selectsDeMinutos() {
    const selectElements = document.querySelectorAll('.minutesSelect');

    for (let selectElement of selectElements) {
      const zeroOption = document.createElement('option');
      zeroOption.value = '0';
      zeroOption.textContent = '00';
      selectElement.appendChild(zeroOption);

      for (let i = 1; i <= 59; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString().padStart(2, '0');
        selectElement.appendChild(option);
      }
    }
  }

  // Função para criar os options de 0 a 60 segundos
  function selectDeSegundos() {
    const selectElements = document.querySelectorAll('.secondsSelect');

    for (let selectElement of selectElements) {
      const zeroOption = document.createElement('option');
      zeroOption.value = '0';
      zeroOption.textContent = '00';
      selectElement.appendChild(zeroOption);

      for (let i = 1; i <= 60; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString().padStart(2, '0');
        selectElement.appendChild(option);
      }
    }
  }

  // Função para criar os options de 1 a 60 para as seções
  function selectDeSecoes() {
    const selectElement = document.getElementById('quantity-sections');

    for (let i = 1; i <= 60; i++) {
      const option = document.createElement('option');
      option.value = i.toString(); // Não adiciona o zero à esquerda nos values das options
      option.textContent = i.toString(); // Não adiciona o zero à esquerda no texto das options
      selectElement.appendChild(option);
    }

    selectElement.value = '1'; // Mantém o valor "1" como padrão
  }

  // Função para capturar os valores selecionados nos acordeões de exercícios e descanso
  function captureSelectedValues() {
    const exerciseMinutesSelect = document.querySelector('#exercise-minutes-select');
    const exerciseSecondsSelect = document.querySelector('#exercise-seconds-select');
    const restMinutesSelect = document.querySelector('#rest-minutes-select');
    const restSecondsSelect = document.querySelector('#rest-seconds-select');
    const sectionsQuantitySelect = document.querySelector('#quantity-sections');
    const sectionsQuantityExerciseSelect = document.querySelector('#quantity-exercise');

    exerciseMinutesSelect.addEventListener('change', captureSelectedValues);
    exerciseSecondsSelect.addEventListener('change', captureSelectedValues);
    restMinutesSelect.addEventListener('change', captureSelectedValues);
    restSecondsSelect.addEventListener('change', captureSelectedValues);
    sectionsQuantitySelect.addEventListener('change', captureSelectedValues);
    sectionsQuantityExerciseSelect.addEventListener('change', captureSelectedValues);

    exercicioMinutos = exerciseMinutesSelect.value;
    exercicioSegundos = exerciseSecondsSelect.value;
    descansoMinutos = restMinutesSelect.value;
    descansoSegundos = restSecondsSelect.value;
    secoesQuantidade = sectionsQuantitySelect.value;
    exercicioQuantidade = sectionsQuantityExerciseSelect.value;
  }

  // Função principal que chama as funções específicas para cada elemento e captura os valores selecionados
 




  function construindoConfiguracaoDoTreino() {
    exercicioQuantidade = parseInt(exercicioQuantidade);
    exercicioMinutos = parseInt(exercicioMinutos);
    exercicioSegundos = parseInt(exercicioSegundos);
    descansoMinutos = parseInt(descansoMinutos);
    descansoSegundos = parseInt(descansoSegundos);
    secoesQuantidade = parseInt(secoesQuantidade);

    const totalTempoExercicio = exercicioMinutos * 60 + exercicioSegundos;
    const totalTempoDescanso = descansoMinutos * 60 + descansoSegundos;
    const configuracoes = {
      quantidadeSecoes: secoesQuantidade,
      tempoExercicio: totalTempoExercicio,
      tempoDescanso: totalTempoDescanso,
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
      tempo: configuracoes.tempoExercicio

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

  function createOptions() {
    selectQuantidadeDeExercicios()
    selectsDeMinutos();
    selectDeSegundos();
    selectDeSecoes();
    captureSelectedValues();

  }
  window.onload = function () {
    createOptions();
  }; */
