/*
========================================
PARTE 6: SIMULADOR DE INTELIGÊNCIA ARTIFICIAL
Utilização de async, await e Promises
========================================
*/

// Lista de curiosidades que a Vinyl AI pode revelar
const curiosidades = [
    {
        titulo: "A origem de uma capa lendária",
        texto: "A capa de Unknown Pleasures, do Joy Division, apresenta uma representação visual de ondas de rádio emitidas por um pulsar. A imagem foi retirada de uma publicação científica.",
        categoria: "PÓS-PUNK",
    },

    {
        titulo: "Um marco na história do metal",
        texto: "Master of Puppets foi o primeiro álbum do Metallica a contar com o baixista Cliff Burton em todas as faixas de um disco lançado pela banda.",
        categoria: "HEAVY METAL",
    },

    {
        titulo: "O som característico do The Cure",
        texto: "Robert Smith ajudou a construir a identidade sonora do The Cure usando camadas de guitarras e efeitos como chorus, criando atmosferas bastante reconhecíveis.",
        categoria: "ROCK GÓTICO",
    },

    {
        titulo: "O grunge conquistou o mundo",
        texto: "Nevermind, do Nirvana, ajudou a levar o grunge de Seattle ao grande público no início dos anos 1990.",
        categoria: "GRUNGE",
    },

    {
        titulo: "O punk e sua atitude independente",
        texto: "O movimento punk também ficou conhecido pela cultura do DIY, sigla para Do It Yourself, que incentivava bandas a produzir e divulgar sua própria música.",
        categoria: "PUNK ROCK",
    },

    {
        titulo: "Uma banda que mudou o rock alternativo",
        texto: "O Radiohead começou sua trajetória usando o nome On a Friday, uma referência ao dia da semana em que seus integrantes costumavam ensaiar.",
        categoria: "ROCK ALTERNATIVO",
    },
];

// Elementos da Vinyl AI
const botaoAI = document.getElementById("ai-botao");
const tituloAI = document.getElementById("ai-titulo");
const curiosidadeAI = document.getElementById("ai-curiosidade");
const categoriaAI = document.getElementById("ai-categoria");
const labelAI = document.querySelector(".vinyl-ai-label");

// Guarda a última curiosidade exibida
let ultimaCuriosidade = -1;

// Função que cria uma espera utilizando Promise
function esperar(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo));
}

// Função responsável por revelar uma curiosidade
async function descobrirCuriosidade() {
    // Impede novos cliques durante o processamento
    if (botaoAI.disabled) return;

    let indice;

    // Evita repetir a curiosidade anterior
    do {
        indice = Math.floor(Math.random() * curiosidades.length);
    } while (indice === ultimaCuriosidade);

    ultimaCuriosidade = indice;

    // Seleciona a curiosidade sorteada
    const curiosidade = curiosidades[indice];

    // Inicia a simulação de processamento
    botaoAI.disabled = true;
    botaoAI.innerHTML = '<i class="bi bi-arrow-repeat"></i> ANALISANDO ARQUIVOS...';

    tituloAI.textContent = "Consultando arquivos musicais...";
    curiosidadeAI.textContent = "A Vinyl AI está procurando algo interessante para você.";
    categoriaAI.textContent = "PROCESSANDO INFORMAÇÕES...";

    // Aguarda o processamento simulado
    await esperar(1500);

    // Exibe o título da curiosidade
    tituloAI.textContent = curiosidade.titulo;

    // Limpa o texto anterior
    curiosidadeAI.textContent = "";

    // Inicia o efeito de digitação
    for (let caractere = 0; caractere < curiosidade.texto.length; caractere++) {
        // Adiciona um caractere por vez
        curiosidadeAI.textContent += curiosidade.texto.charAt(caractere);

        // Aguarda antes de adicionar o próximo caractere
        await esperar(25);
    }

    // Atualiza a categoria
    categoriaAI.textContent = curiosidade.categoria;

    // Atualiza o número do arquivo musical
    labelAI.textContent = `ARQUIVO MUSICAL #${String(indice + 1).padStart(3, "0")}`;

    // Libera o botão após a digitação
    botaoAI.disabled = false;
    botaoAI.innerHTML = '<i class="bi bi-stars"></i> DESCOBRIR CURIOSIDADE';
}

// Conecta o botão à função
if (botaoAI && tituloAI && curiosidadeAI && categoriaAI && labelAI) {
    botaoAI.addEventListener("click", descobrirCuriosidade);
} else {
    console.error("Não encontrei todos os elementos da Vinyl AI!");
}
