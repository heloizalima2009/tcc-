document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    const startBtn = document.getElementById('startBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const lightStatus = document.getElementById('lightStatus');
    const scoreDisplay = document.getElementById('score');
    const modalOverlay = document.getElementById('modalOverlay');
    const resetBtn = document.getElementById('resetBtn');

    // Configurações do Personagem Fotógrafo
    let character = {
        x: 50,
        y: 190,
        width: 50,
        height: 80,
        speed: 4,
        direction: 1 // 1 = Direita, -1 = Esquerda
    };

    // Alvo Central do Estúdio (A Iluminação do Holofote)
    const lightZone = {
        x: 260,
        width: 80
    };

    let score = 0;
    let gameActive = false;
    let flashOpacity = 0;
    let animationFrameId;
    let textFeedback = "";
    let textFeedbackTimer = 0;

    // Configuração dos eventos de clique sem conflito
    startBtn.addEventListener('click', startGame);
    cameraBtn.addEventListener('click', takePhoto);
    resetBtn.addEventListener('click', resetGame);

    function startGame() {
        score = 0;
        gameActive = true;
        startBtn.disabled = true;
        cameraBtn.disabled = false;
        lightStatus.innerText = "Buscando Ângulo... 🟡";
        lightStatus.style.color = "#ffeaa7";
        character.speed = 4.5 + Math.random() * 2; // Velocidade variada a cada partida
        
        gameLoop();
    }

    // Loop Engine de Renderização Dinâmica
    function gameLoop() {
        if (!gameActive && flashOpacity <= 0) {
            cancelAnimationFrame(animationFrameId);
            return;
        }

        updatePhysics();
        renderGraphics();

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function updatePhysics() {
        if (gameActive) {
            // Deslocamento contínuo do personagem
            character.x += character.speed * character.direction;

            // Colisão com as bordas laterais do estúdio (Efeito Rebater)
            if (character.x + character.width > canvas.width) {
                character.direction = -1;
            } else if (character.x < 0) {
                character.direction = 1;
            }
        }

        // Dissipação suave do efeito de flash na foto
        if (flashOpacity > 0) {
            flashOpacity -= 0.06;
        }

        // Timer do texto informativo de erro
        if (textFeedbackTimer > 0) {
            textFeedbackTimer--;
        } else {
            textFeedback = "";
        }
    }

    function renderGraphics() {
        // Limpa o frame anterior e aplica o plano de fundo do cenário
        ctx.fillStyle = "#151a21";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Desenha o feixe cônico de luz do estúdio
        ctx.fillStyle = "#fffae6";
        ctx.beginPath();
        ctx.moveTo(300, 0);
        ctx.lineTo(lightZone.x, canvas.height - 30);
        ctx.lineTo(lightZone.x + lightZone.width, canvas.height - 30);
        ctx.closePath();
        ctx.globalAlpha = 0.12; 
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Base do Chão
        ctx.fillStyle = "#1f2833";
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);

        // DESENHO DO PERSONAGEM (Fotógrafo Avançado)
        // Cabeça
        ctx.fillStyle = "#ffdbac";
        ctx.beginPath();
        ctx.arc(character.x + 25, character.y + 15, 14, 0, Math.PI * 2);
        ctx.fill();
        
        // Corpo / Traje Técnico
        ctx.fillStyle = "#0984e3";
        ctx.fillRect(character.x + 12, character.y + 29, 26, 45);

        // Equipamento fotográfico integrado de acordo com a direção do movimento
        ctx.fillStyle = "#2d3436";
        if (character.direction === 1) {
            ctx.fillRect(character.x + 28, character.y + 34, 18, 12);
            ctx.fillStyle = "#00cec9";
            ctx.fillRect(character.x + 42, character.y + 38, 5, 4); 
        } else {
            ctx.fillRect(character.x + 4, character.y + 34, 18, 12);
            ctx.fillStyle = "#00cec9";
            ctx.fillRect(character.x + 4, character.y + 38, 5, 4); 
        }

        // Renderiza avisos na tela de jogo
        if (textFeedback !== "") {
            ctx.fillStyle = "#ff7675";
            ctx.font = "14px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(textFeedback, canvas.width / 2, 140);
        }

        // Sobreposição do Flash de Câmera
        if (flashOpacity > 0) {
            ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    function takePhoto() {
        if (!gameActive) return;

        flashOpacity = 1.0; // Dispara o flash imediatamente

        // Validação milimétrica do centro do personagem dentro do feixe de luz
        let characterCenter = character.x + (character.width / 2);
        if (characterCenter >= lightZone.x && characterCenter <= (lightZone.x + lightZone.width)) {
            score++;
            scoreDisplay.innerText = `${score}/3`;
            
            if (score >= 3) {
                gameActive = false;
                cameraBtn.disabled = true;
                lightStatus.innerText = "Foco Travado! 🟢";
                lightStatus.style.color = "#55efc4";
                
                setTimeout(() => {
                    modalOverlay.style.display = "flex";
                }, 300);
            } else {
                textFeedback = "📸 Excelente Enquadramento! Continue!";
                textFeedbackTimer = 45;
                // Aumenta sutilmente o desafio aumentando a velocidade na próxima pose
                character.speed += 0.8; 
            }
        } else {
            textFeedback = "❌ Fora de foco! Errou o timing da iluminação.";
            textFeedbackTimer = 60;
        }
    }

    function resetGame() {
        modalOverlay.style.display = "none";
        startBtn.disabled = false;
        cameraBtn.disabled = true;
        character.x = 50;
        character.direction = 1;
        lightStatus.innerText = "Aguardando...";
        lightStatus.style.color = "#fff";
        scoreDisplay.innerText = "0/3";
        textFeedback = "";
        renderGraphics(); 
    }

    // Renderização do quadro estático inicial
    renderGraphics();
});
