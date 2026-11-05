/ Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os links do menu que apontam para IDs internos
    const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita o pulo brusco padrão

            // Pega o ID do destino (ex: #servicos)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Rola suavemente até a seção desejada
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});