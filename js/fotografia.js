document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 60; // Quanto menor, mais rápida é a animação numérica

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Define o incremento por passo
            const inc = Math.ceil(target / speed);

            // Verifica se o valor final foi alcançado
            if (count < target) {
                // Adiciona o incremento e roda novamente
                if(target === 2400) {
                    // Formata a exibição do "2.4k" de forma simples
                    if (count + inc >= target) {
                        counter.innerText = "2.4k";
                    } else {
                        counter.innerText = ((count + inc)/1000).toFixed(1) + "k";
                    }
                } else {
                    counter.innerText = count + inc;
                }
                setTimeout(updateCount, 20);
            } else {
                if(target === 2400) {
                    counter.innerText = "2.4k";
                } else {
                    counter.innerText = target;
                }
            }
        };

        updateCount();
    });
});
