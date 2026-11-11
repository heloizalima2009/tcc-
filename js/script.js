const photoFrame = document.getElementById('photoFrame');
const stage = document.querySelector('.studio-stage');
const shootBtn = document.getElementById('shoot-btn');
const promoModal = document.getElementById('promo-modal');
const flash = document.getElementById('flash');
const promoTitle = document.getElementById('promo-title');
const promoFeedback = document.getElementById('promo-feedback');
const prizeText = document.getElementById('prize-text');
const closeModalBtn = document.getElementById('close-modal-btn');
const couponBox = document.querySelector('.coupon-box');

shootBtn.addEventListener('click', () => {
    // Pega as coordenadas físicas exatas da fase e do quadro deslizante
    const stageRect = stage.getBoundingClientRect();
    const frameRect = photoFrame.getBoundingClientRect();

    // Calcula os pontos centrais horizontais exatos
    const stageCenter = stageRect.left + (stageRect.width / 2);
    const frameCenter = frameRect.left + (frameRect.width / 2);

    // Calcula a distância absoluta em pixels do centro perfeito
    const distanceToCenter = Math.abs(frameCenter - stageCenter);

    // Ativa o clarão físico do flash profissional na tela
    flash.classList.add('flash-active');
    setTimeout(() => flash.classList.remove('flash-active'), 250);

    // CRITÉRIO DE DIFICULDADE RÍGIDO (Tolerância extrema de até 6 pixels para simular o acerto 100%)
    const perfectHitTolerance = 6;

    if (distanceToCenter <= perfectHitTolerance) {
        // GANHOU A PROMOÇÃO BOA (Acerto 100% no local correto)
        promoTitle.innerText = "🎯 Alinhamento 100% Perfeito!";
        promoFeedback.innerText = "Incrível! Você obteve precisão milimétrica. A obra de arte Fine Art foi centralizada sem nenhuma distorção.";
        prizeText.innerText = "30% DE DESCONTO EM QUALQUER COLEÇÃO PREMIUM";
        couponBox.innerText = "CUPOM: LIMA100PERFECT";
    } else {
        // ERROU O CENTRO - Ganha o prêmio padrão/consolação do site
        promoTitle.innerText = "📸 Enquadramento Fora de Centro";
        promoFeedback.innerText = "Quase! A moldura ficou levemente deslocada do eixo dourado principal, resultando em uma captura descentralizada.";
        prizeText.innerText = "10% DE DESCONTO EM PRODUTOS ADICIONAIS";
        couponBox.innerText = "CUPOM: LIMAEXPO10";
    }

    // Exibe o painel de resultados promocionais
    promoModal.classList.remove('hidden');
});

// Reseta a animação e o fluxo do quadro ao fechar o painel
closeModalBtn.addEventListener('click', () => {
    promoModal.classList.add('hidden');
    
    // Força o reset físico dos keyframes para reiniciar a corrida do quadro
    photoFrame.classList.remove('move-animation');
    void photoFrame.offsetWidth;
    photoFrame.classList.add('move-animation');
});
