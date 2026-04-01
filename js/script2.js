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

const chatInput = document.getElementById('chat-input');
const btnEnviar = document.getElementById('btn-enviar');
const chatMessages = document.getElementById('chat-messages');

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const GROQ_API_KEY = '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'; 

async function buscarRespostaSwiftie(mensagemUsuario) {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant", 
                messages: [
                    {
                        role: "system",
                        content: "Você é um assistente virtual especialista na Taylor Swift. Responda de forma curta, em português, com muita empolgação, usando emojis fofos (✨💖🐍🦋), álbuns e letras das músicas da Taylor Swift. Curiosidades sobre a Taylor Swift, tanto vida amorosa, quanto musicas. Seja muito amigável, Mande mensagens curtas, e sempre se mantenha atualizado sobre os fatos/curiosidades da Taylor Swift"
                    },
                    {
                        role: "user",
                        content: mensagemUsuario
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Detalhes do erro do Groq:", data);
            throw new Error(data.error?.message || `Erro de rede: ${response.status}`);
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.error("Erro ao chamar o Groq:", error);
        return "Ops! O sistema da Taylor disse: " + error.message;
    }
}

btnEnviar.addEventListener('click', async () => {
    const userText = chatInput.value.trim();
    if (userText === '') return;

    addMessage(userText, 'user');
    chatInput.value = '';

    const typingId = 'typing-' + Date.now();
    const typingMsg = document.createElement('div');
    typingMsg.classList.add('message', 'bot');
    typingMsg.id = typingId;
    typingMsg.innerText = 'Escrevendo no diário... 🖋️';
    chatMessages.appendChild(typingMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const respostaBot = await buscarRespostaSwiftie(userText);

    document.getElementById(typingId).remove();
    addMessage(respostaBot, 'bot');
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnEnviar.click();
    }
});

// ==========================================
// 5. SURPRESA DO DIA DOS NAMORADOS (12/06)
// ==========================================
function setupValentineSurprise() {
    const hoje = new Date();
    const mes = hoje.getMonth(); // Janeiro é 0, Junho é 5
    const dia = hoje.getDate();

    // Checa se hoje é dia 12 de Junho
    if (mes === 5 && dia === 12) {
        
        const overlay = document.createElement('div');
        overlay.id = 'valentine-overlay';
        overlay.style.display = 'block'; 
        
        overlay.innerHTML = `
            <div class="val-table">
                <div class="val-cell">
                    <form>
                        <div class="val-wrapper" id="val-wrap">
                            <input type="checkbox" id="ck1"/>
                            <label for="ck1">Eu</label>
                            
                            <input type="checkbox" id="ck2"/>
                            <label for="ck2">amo</label>
                            
                            <input type="checkbox" id="ck3"/>
                            <label for="ck3">você</label>
                            
                            <span>(clica nas palavras)</span>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const ck1 = document.getElementById('ck1');
        const ck2 = document.getElementById('ck2');
        const ck3 = document.getElementById('ck3');
        const wrapper = document.getElementById('val-wrap');

        function checkClick() {
            if (ck1.checked && ck2.checked && ck3.checked) {
                if (!wrapper.classList.contains('throb')) {
                    wrapper.classList.add('throb');
                    
                    // LÓGICA NOVA: Espera 4 segundos (4000 ms) e some com a tela
                    setTimeout(() => {
                        overlay.style.transition = 'opacity 1.5s ease';
                        overlay.style.opacity = '0'; // Faz esmaecer
                        
                        // Espera a animação de sumir terminar para deletar o código HTML
                        setTimeout(() => {
                            overlay.remove();
                        }, 1500);
                    }, 4000);
                }
            } else {
                if (wrapper.classList.contains('throb')) {
                    wrapper.classList.remove('throb');
                }
            }
        }

        ck1.addEventListener('change', checkClick);
        ck2.addEventListener('change', checkClick);
        ck3.addEventListener('change', checkClick);
    }
}

setupValentineSurprise();

// ==========================================
// 6. CARTA AUTOMÁTICA TODO DIA 17
// ==========================================
function verificarCartaMensal() {
    const hoje = new Date();
    const dia = hoje.getDate();
    
    const dataFormatada = hoje.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    if (dia === 17) {
        const overlay = document.createElement('div');
        overlay.className = 'letter-overlay';
        overlay.id = 'monthly-letter';

        overlay.innerHTML = `
            <div class="letter-paper">
                <div class="letter-header">${dataFormatada}</div>
                <div class="letter-content">
Minha querida Mirella,

Hoje é dia 17… o nosso dia.
E sempre que ele chega, eu paro um instante para lembrar de tudo que a gente construiu até aqui — dos pequenos momentos que, sem perceber, viraram parte de mim.

Queria que, ao abrir este site, você sentisse um pouco do que eu sinto todos os dias: a sorte imensa de ter você ao meu lado.

Desde setembro, quando a nossa história começou oficialmente, minha vida ganhou mais cor, mais calma e mais sentido. E o mais bonito é saber que, a cada dia, eu descubro um novo motivo pra te amar ainda mais.

Obrigado por ser minha parceira, meu refúgio e também minha melhor escolha.

Com todo o meu amor ❤️
                </div>
                <div class="letter-footer">Feliz mais um mês juntos!</div>
                <button class="close-letter-btn" onclick="document.getElementById('monthly-letter').remove()">Fechar Carta</button>
            </div>
        `;

        document.body.appendChild(overlay);
    }
}

verificarCartaMensal();
