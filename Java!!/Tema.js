/*
========================================
PARTE 1: MODO ESCURO
Manipulação de classes e persistência
com localStorage
========================================
*/

// Seleciono o botão e o ícone responsáveis pela troca de tema
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

// Recupero o tema salvo no navegador ou utilizo o modo escuro como padrão
const temaSalvo = localStorage.getItem("tema") || "dark";

// Aplico o tema salvo ao elemento principal da página
document.documentElement.dataset.theme = temaSalvo;

// Função responsável por atualizar o ícone do botão
function atualizarIcone() {
    const temaAtual = document.documentElement.dataset.theme;

    // Verifico qual tema está ativo para escolher o ícone correspondente
    if (temaAtual === "dark") {
        themeIcon.className = "bi bi-moon-stars-fill";
    } else {
        themeIcon.className = "bi bi-sun-fill";
    }
}

// Verifico se o botão existe antes de adicionar o evento
if (themeToggle && themeIcon) {
    // Adiciono um evento para trocar o tema ao clicar no botão
    themeToggle.addEventListener("click", () => {
        const temaAtual = document.documentElement.dataset.theme;

        // Alterno entre os temas claro e escuro
        const novoTema = temaAtual === "dark" ? "light" : "dark";

        // Atualizo o tema da página
        document.documentElement.dataset.theme = novoTema;

        // Salvo a preferência no armazenamento local do navegador
        localStorage.setItem("tema", novoTema);

        // Atualizo o ícone após a mudança
        atualizarIcone();
    });

    // Atualizo o ícone assim que a página é carregada
    atualizarIcone();
}
