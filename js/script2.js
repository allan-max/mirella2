// ==========================================
// 1. LÓGICA DO CONTADOR
// ==========================================
function calcularTempo() {
    const dataInicio = new Date(2025, 8, 17); // 17 de Setembro de 2025
    const dataAtual = new Date();

    let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
    let meses = dataAtual.getMonth() - dataInicio.getMonth();
    let dias = dataAtual.getDate() - dataInicio.getDate();

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    const totalMeses = (anos * 12) + meses;
    const textoMeses = totalMeses === 1 ? 'mês' : 'meses';
    const textoDias = dias === 1 ? 'dia' : 'dias';

    let resultado = '';
    if (totalMeses > 0) resultado += `<span class="numero">${totalMeses}</span> ${textoMeses}`;
    if (totalMeses > 0 && dias > 0) resultado += ` e `;
    if (dias > 0 || totalMeses === 0) resultado += `<span class="numero">${dias}</span> ${textoDias}`;

    document.getElementById('contador').innerHTML = resultado;
}
calcularTempo();

// ==========================================
// 2. LÓGICA DO PLAYER RETRÁTIL
// ==========================================
const miniPlayer = document.getElementById('mini-player');
const toggleBtn = document.getElementById('toggle-player');

toggleBtn.addEventListener('click', () => {
    miniPlayer.classList.toggle('closed');
});

// ==========================================
// 3. LÓGICA DOS CORAÇÕES NEON DE FUNDO
// ==========================================
function createNeonHeart() {
    const bgContainer = document.getElementById('neon-bg-container');
    const heart = document.createElement('div');
    heart.classList.add('neon-heart');
    heart.innerHTML = '❤️';

    heart.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 10 + 10; 
    heart.style.animationDuration = duration + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';

    bgContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}
setInterval(createNeonHeart, 1500);

// ==========================================
// 4. LÓGICA DO CHAT DA TAYLOR SWIFT (GROQ)
// ==========================================

// Variáveis do DOM que estavam faltando
const chatInput = document.getElementById('chat-input');
const btnEnviar = document.getElementById('btn-enviar');
const chatMessages = document.getElementById('chat-messages');

// Função para adicionar mensagens na tela do chat
function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    // Rola o chat para baixo automaticamente
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Sua chave descartável do Groq
const GROQ_API_KEY = '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'; 

async function buscarRespostaSwiftie(mensagemUsuario) {
    try {
        const response = await fetch('https://corsproxy.io/?https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", 
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente virtual especialista na Taylor Swift. Você está no site que um namorado fez de presente para a namorada dele. Responda de forma curta, em português, com muita empolgação, usando emojis fofos (✨💖🐍🦋) e fazendo referências inteligentes às 'Eras', álbuns e letras das músicas da Taylor Swift. Seja muito amigável e romântico."
                    },
                    {
                        role: "user",
                        content: mensagemUsuario
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error("Erro ao chamar o Groq:", error);
        return "Ops! Perdi o sinal com a central das Eras... Tente de novo! 💔";
    }
}

// Evento de clique do botão Enviar
btnEnviar.addEventListener('click', async () => {
    const userText = chatInput.value.trim();
    if (userText === '') return;

    // Adiciona a mensagem do usuário
    addMessage(userText, 'user');
    chatInput.value = '';

    // Mostra "Digitando..." temporariamente
    const typingId = 'typing-' + Date.now();
    const typingMsg = document.createElement('div');
    typingMsg.classList.add('message', 'bot');
    typingMsg.id = typingId;
    typingMsg.innerText = 'Escrevendo no diário... 🖋️';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Chama a API do Groq
    const respostaBot = await buscarRespostaSwiftie(userText);

    // Remove o "Digitando..." e coloca a resposta real
    document.getElementById(typingId).remove();
    addMessage(respostaBot, 'bot');
});

// Permite enviar a mensagem apertando a tecla "Enter"
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnEnviar.click();
    }
});
