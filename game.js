const bloco = 25;
const linhas = 25;
const colunas = 25;

var snake = [
  {x: bloco * 2, y: 0},
  {x: bloco, y: 0},
  {x: 0, y: 0}
];

var comidaX;
var comidaY;

var velocidadeX = 1;
var velocidadeY = 0;
var velocidade = 150;

var rodando = false;
var pontuacaoAtual = 0;
var maiorPontuacao = 0;

const arena = document.getElementById("arena");
arena.height = linhas * bloco;
arena.width = colunas * bloco;
const context = arena.getContext("2d");

const placarAtual = document.getElementById("currentScoreValue");
const placarRecord = document.getElementById("maximumScoreValue");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

const btnIniciar = document.getElementById("btnComecar");
const btnJogarNovamente = document.getElementById("btnJogarNovamente");
const overlayModal = document.getElementById("overlayModal");
const dialogoInicio = document.getElementById("boxDialogoInicio");
const dialogoFim = document.getElementById("boxDialgoFim");

// desenha a arena do jogo
context.fillStyle = "#c1c1c100";
arena.style.border = '1px solid black';
context.fillRect(0, 0, arena.width, arena.height);
context.clearRect(0, 0, arena.width, arena.height);

// adiciona o evento de detecção de tecla pressionada
document.addEventListener("keydown", mudaDirecao);

// adiciona evento de click para o botão iniciar do diálogo inicial
btnIniciar.addEventListener("click", () => {

  fechaDialogoInicio();
  iniciaJogo();

});

// adiciona evento de click para o botão iniciar do diálogo final
btnJogarNovamente.addEventListener("click", () => {

  fechaDialogoFinal();
  iniciaJogo();

});

// Inicializa o jogo
function iniciaJogo() {

  rodando = true;
  placarAtual.innerText = pontuacaoAtual;
  posicionaComida();
  desenhaComida();
  atualizaArena();

}

// Posiciona a comida em uma posição aleatória na tela do jogo
function posicionaComida() {

  comidaX = Math.floor(Math.random() * colunas) * bloco;
  comidaY = Math.floor(Math.random() * linhas) * bloco;

}

// Desenha a comida na tela do jogo
function desenhaComida() {

  var comidaImg = new Image();
  comidaImg.src = "assets/comida.svg";
  context.drawImage(comidaImg, comidaX - 5, comidaY -2, 35 , 35);

}

// Atualiza a tela do jogo
function atualizaArena() {
  if (rodando) {

    setTimeout(() => {

      // atualiza a arena do jogo
      context.fillStyle = "#c1c1c100";
      arena.style.border = '1px solid black';
      context.fillRect(0, 0, arena.width, arena.height);
      context.clearRect(0, 0, arena.width, arena.height);

      desenhaComida();
      movimentaCobra();
      desenhaCobra();
      verificaColisao();
      atualizaArena();
    }, velocidade);

  } else {

    fimDeJogo();

  }
}

// Movimenta a cobra na tela do jogo
function movimentaCobra() {

  const cabeca = {
    x: snake[0].x + velocidadeX * bloco,
    y: snake[0].y + velocidadeY * bloco
  };

  snake.unshift(cabeca);

  // detecção de colisão com o alimento
  if (snake[0].x == comidaX && snake[0].y == comidaY) {

    pontuacaoAtual += 1;
    placarAtual.innerHTML = pontuacaoAtual;
    velocidade += -2;
    posicionaComida();

  } else {

    snake.pop();
    
  }

}

// Desenha a cobra na tela do jogo
function desenhaCobra() {

  snake.forEach(parteDoCorpo => {
    var corpoCobra = new Image();
    corpoCobra.src = "assets/corpo.svg";
    context.drawImage(corpoCobra, parteDoCorpo.x, parteDoCorpo.y, bloco, bloco);
  });

  var cabecaCobra = new Image();
  cabecaCobra.src = "assets/cabeca.svg";
  context.drawImage(cabecaCobra, snake[0].x, snake[0].y, bloco, bloco);

}

// Verifica se ocorreu alguma colisão na tela do jogo
function verificaColisao() {

  //verfica colisão com as bordas da arena
  if (snake[0].x < 0 || snake[0].x >= arena.width || snake[0].y < 0 || snake[0].y >= arena.height) {
    rodando = false;
  }

  // verifica colisão com o proprio corpo
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      rodando = false;
    }
  }

}

// Função para mudar a direção da cobra com base nas teclas de seta pressionadas
function mudaDirecao(e) {

  if (e.code == "ArrowUp" && velocidadeY != 1) {
    velocidadeX = 0;
    velocidadeY = -1;
  } else if (e.code == "ArrowDown" && velocidadeY != -1) {
    velocidadeX = 0;
    velocidadeY = 1;
  } else if (e.code == "ArrowLeft" && velocidadeX != 1) {
    velocidadeX = -1;
    velocidadeY = 0;
  } else if (e.code == "ArrowRight" && velocidadeX != -1) {
    velocidadeX = 1;
    velocidadeY = 0;
  }

}

// Função chamada quando o jogo termina
function fimDeJogo() {

  abreDialogoFinal();

  pontuacaoFinal.innerText = pontuacaoAtual;

  if (pontuacaoAtual > maiorPontuacao) {

    maiorPontuacao = pontuacaoAtual;
    placarRecord.innerText = maiorPontuacao;

  }

  pontuacaoAtual = 0;
  velocidadeX = 1;
  velocidadeY = 0;
  velocidade = 150;
  snake = [
    {x: bloco * 2, y: 0},
    {x: bloco, y: 0},
    {x: 0, y: 0}
  ];

}

// Fecha o diálogo de início do jogo
function fechaDialogoInicio() {

  overlayModal.classList.toggle("boxDialogoInicioHide");
  dialogoInicio.classList.toggle("boxDialogoInicioHide");

}

// Abre o diálogo de fim do jogo
function abreDialogoFinal() {

  overlayModal.classList.toggle("boxDialogoInicioHide");
  dialogoFim.classList.toggle("boxDialgoFimDeJogoShow");

}

// Fecha o diálogo de fim do jogo
function fechaDialogoFinal() {

  overlayModal.classList.toggle("boxDialogoInicioHide");
  dialogoFim.classList.toggle("boxDialgoFimDeJogoShow");

}
