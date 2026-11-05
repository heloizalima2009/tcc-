const IDEAL_EXPOSURE = 100; 
const IDEAL_BLUR = 0;       


const exposureSlider = document.getElementById('exposure');
const blurSlider = document.getElementById('blur');
const photo = document.getElementById('photo');
const btnSnap = document.getElementById('btn-snap');
const resultDiv = document.getElementById('result');




function updateVisuals() {
    const expValue = exposureSlider.value;
    const blurValue = blurSlider.value;

    
    photo.style.filter = `brightness(${expValue}%) blur(${blurValue}px)`;
}

 
function takePhoto() {
    const currentExposure = parseInt(exposureSlider.value, 10);
    const currentBlur = parseInt(blurSlider.value, 10);
    
    const exposureDiff = Math.abs(currentExposure - IDEAL_EXPOSURE)
    const blurDiff = Math.abs(currentBlur - IDEAL_BLUR) * 5; 
    
    let score = 100 - (exposureDiff + blurDiff)
    if (score < 0) score = 0;
    score = Math.round(score);

    if (score >= 90) {
        resultDiv.innerHTML = `⭐ Pontuação: ${score}/100<br><span style="color: #2ed573;">Incrível! Você tem olhos de fotógrafo profissional! 📸</span>`;
    } else if (score >= 70) {
        resultDiv.innerHTML = `⭐ Pontuação: ${score}/100<br><span style="color: #ffa502;">Quase lá! A foto ficou legal, mas o ajuste fino pode melhorar.</span>`;
    } else {
        resultDiv.innerHTML = `⭐ Pontuação: ${score}/100<br><span style="color: #ff4757;">A foto não ficou muito boa... Que tal deixar isso com quem entende e agendar um ensaio profissional? 😉</span>`;
    }
}
exposureSlider.addEventListener('input', updateVisuals);
blurSlider.addEventListener('input', updateVisuals);

btnSnap.addEventListener('click', takePhoto);

updateVisuals();
