/*
========================================
PARTE 3: ALERTA DINÂMICO
Criação de elementos com JavaScript
e utilização de setTimeout()
========================================
*/

// Seleciono a área principal da página
const areaPrincipal = document.querySelector("main");

// Função responsável por criar e exibir o aviso
function mostrarAviso() {
    // Verifico se a área principal existe
    if (!areaPrincipal) {
        return;
    }

    // Crio a caixa que vai receber o aviso
    const aviso = document.createElement("div");
    aviso.classList.add("alerta-vinyl");

    // Crio o texto que será exibido
    const texto = document.createElement("p");
    texto.textContent = "🎵 Ei! Confira as curiosidades do mundo da música na nossa página de novidades!";

    // Crio o botão para fechar o aviso
    const botaoFechar = document.createElement("button");
    botaoFechar.textContent = "×";
    botaoFechar.classList.add("fechar-alerta-vinyl");

    // Defino uma descrição para acessibilidade
    botaoFechar.setAttribute("aria-label", "Fechar aviso");

    // Adiciono o evento de clique ao botão
    botaoFechar.addEventListener("click", () => {
        aviso.remove();
    });

    // Coloco o texto e o botão dentro do aviso
    aviso.appendChild(texto);
    aviso.appendChild(botaoFechar);

    // Adiciono o aviso no início da área principal
    areaPrincipal.prepend(aviso);
}

// Aguardo 2 segundos antes de mostrar o aviso
setTimeout(mostrarAviso, 2000);
