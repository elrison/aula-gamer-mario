const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let score = 0; // Inicializa o contador de pontos
const scoreDisplay = document.createElement('div'); // Cria um display para os pontos

// Estilo básico para o display de pontos
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.color = 'Black';
document.body.appendChild(scoreDisplay); // Adiciona o display na página

let counted = false; // Variável para garantir que só conte um ponto por cano

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
    
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    // Verifica a colisão entre o Mario e o cano
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.src = '../img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        mario.classList.remove('jump');

        clearInterval(loop);

    } else if (pipePosition < 0 && !counted) {  // Quando o cano sai completamente da tela e o ponto ainda não foi contado
        score++; // Incrementa a pontuação
        scoreDisplay.innerHTML = `Score: ${score}`; // Atualiza o display de pontos
        counted = true; // Marca como contado para evitar contar novamente o mesmo cano
    }

    // Reseta o marcador "counted" quando o cano voltar para a tela (nova tentativa)
    if (pipePosition > 120) {
        counted = false;
    }
}, 10);

// Adiciona o evento de pulo ao pressionar uma tecla
document.addEventListener('keydown', jump);
