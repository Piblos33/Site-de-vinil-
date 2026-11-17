/*
========================================
MENU DA CONTA
Controle do login pelo cabeçalho
========================================
*/

// Pego os elementos do menu
const menuConta = document.querySelector(".account-menu");
const botaoConta = document.getElementById("account-toggle");
const painelConta = document.getElementById("account-panel");

const miniLogin = document.getElementById("mini-login");
const miniLoginForm = document.getElementById("mini-login-form");
const miniLogado = document.getElementById("mini-logado");
const miniSair = document.getElementById("mini-sair");

// Verifico se o usuário está conectado
function atualizarMenuConta() {
    const usuarioLogado = localStorage.getItem("usuarioLogado") === "true";

    if (usuarioLogado) {
        miniLogin.style.display = "none";
        miniLogado.style.display = "block";
    } else {
        miniLogin.style.display = "block";
        miniLogado.style.display = "none";
    }
}

// Abre e fecha o painel da conta
if (menuConta && botaoConta && painelConta) {
    botaoConta.addEventListener("click", () => {
        painelConta.classList.toggle("account-panel-aberto");
        atualizarMenuConta();
    });

    // Fecha o painel ao clicar fora dele
    document.addEventListener("click", evento => {
        if (!menuConta.contains(evento.target)) {
            painelConta.classList.remove("account-panel-aberto");
        }
    });

    // Fecha o painel ao apertar Escape
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape") {
            painelConta.classList.remove("account-panel-aberto");
        }
    });

    // Login demonstrativo pelo cabeçalho
    miniLoginForm.addEventListener("submit", evento => {
        evento.preventDefault();

        localStorage.setItem("usuarioLogado", "true");

        miniLoginForm.reset();
        atualizarMenuConta();

        alert("Você entrou na sua conta!");
    });

    // Encerra a sessão
    miniSair.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");

        atualizarMenuConta();

        alert("Você saiu da sua conta!");
    });

    // Atualiza o menu ao carregar a página
    atualizarMenuConta();
}
