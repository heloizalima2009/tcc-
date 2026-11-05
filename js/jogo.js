const btnDisparar = document.getElementById('btnDisparar');
const flash = document.getElementById('flash');
const cardPromo = document.getElementById('cardPromo');
const formResgate = document.getElementById('formResgate');
const meuFormulario = document.getElementById('meuFormulario');
const fotografa1 = document.getElementById('fotografa1');
const fotografa2 = document.getElementById('fotografa2');

// Banco Ampliado com Opções de Promoções
const opcoesPremios = [
    { desc: "25% OFF", detalhe: "No Ensaio de Retrato ou Portfólio Individual" },
    { desc: "15% OFF", detalhe: "+ Combo de 8 Fotos Extras Tratadas de Bônus" },
    { desc: "30% OFF", detalhe: "No Segundo Ensaio Familiar ou Infantil" },
    { desc: "GANHOU!", detalhe: "1 Álbum de Fotos com Bolsa de Brinde" },
    { desc: "BRINDE", detalhe: "1 Ensaio Mini Externo de 20 minutos Grátis" }
];

const sorteioPromocao = opcoesPremios[Math.floor(Math.random() * opcoesPremios.length)];
document.getElementById('texto-desconto').innerText = sorteioPromocao.desc;
document.getElementById('texto-brinde').innerText = sorteioPromocao.detalhe;

btnDisparar.addEventListener('click', () => {
    btnDisparar.style.display = 'none';

    // Congela a animação de pose das duas meninas e braços articulados no clique
    fotografa1.style.animation = 'none';
    fotografa2.style.animation = 'none';
    
    const bracos = document.querySelectorAll('.braco');
    bracos.forEach(b => b.style.animation = 'none');

    // Dispara o flash químico do estúdio
    flash.classList.add('piscar-flash');

    setTimeout(() => {
        cardPromo.classList.add('revelado');
        
        setTimeout(() => {
            formResgate.style.display = 'block';
        }, 300);
    }, 200);
});

meuFormulario.addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeCliente').value;
    const cupomGanho = sorteioPromocao.desc + " - " + sorteioPromocao.detalhe;
    
    const seuWhatsappNumero = "5541999999999"; // Substitua pelo seu WhatsApp real
    
    const textoMensagem = encodeURIComponent(`Olá! Meu nome é ${nome} e participei da Sessão de Fotos Premiada no seu site! Desbloqueei a promoção: ${cupomGanho}. Quero fazer meu agendamento!`);
    
    window.open(`https://wa.me{seuWhatsappNumero}?text=${textoMensagem}`, '_blank');
    this.reset();
});
