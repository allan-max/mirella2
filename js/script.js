// Função para criar os corações caindo
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // Você pode mudar para um emoji diferente se quiser

    // Define uma posição horizontal aleatória
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Define uma velocidade de queda aleatória (entre 3 e 7 segundos)
    const fallDuration = Math.random() * 4 + 3; 
    heart.style.animationDuration = fallDuration + 's';

    // Define um tamanho aleatório para os corações
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';

    const container = document.getElementById('hearts-container');
    if(container) {
        container.appendChild(heart);
    }

    // Remove o coração da memória depois que ele termina de cair
    setTimeout(() => {
        heart.remove();
    }, fallDuration * 1000);
}

// Gera um novo coração a cada 300 milissegundos
setInterval(createHeart, 300);

// ==========================================
// Lógica de clique e transição de página
// ==========================================
const botaoFoto = document.getElementById('botao-foto');
const transitionOverlay = document.getElementById('transition-overlay');

if(botaoFoto && transitionOverlay) {
    botaoFoto.addEventListener('click', () => {
        // Ativa a animação da bola preta crescendo
        transitionOverlay.classList.add('active');

        // Espera 1 segundo (tempo da animação) e redireciona para a página 2
        setTimeout(() => {
            window.location.href = 'pagina2.html';
        }, 1000); 
    });
}

// ==========================================
// NOVO: Lógica do Player Retrátil
// ==========================================
const miniPlayer = document.getElementById('mini-player');
const toggleBtn = document.getElementById('toggle-player');

if(miniPlayer && toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        // Adiciona ou remove a classe 'closed' que faz o player deslizar
        miniPlayer.classList.toggle('closed');
    });
}