// Pego os elementos que vou utilizar na página
const listaCarrinho = document.getElementById("lista-carrinho");
const carrinhoVazio = document.getElementById("carrinho-vazio");

const subtotalElemento = document.getElementById("subtotal");
const totalElemento = document.getElementById("total");

// Recupero os produtos que foram salvos no navegador
let carrinho = [];

try {
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (!Array.isArray(carrinho)) {
        carrinho = [];
    }
} catch {
    carrinho = [];
}

// Formato os valores para aparecerem em reais
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

// Atualizo os produtos que aparecem no carrinho
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";

    // Verifico se existe algum produto
    if (carrinho.length === 0) {
        carrinhoVazio.style.display = "block";
        atualizarResumo();
        return;
    }

    carrinhoVazio.style.display = "none";

    // Percorro os produtos salvos
    carrinho.forEach((disco, indice) => {
        const produto = document.createElement("div");

        produto.classList.add("item-carrinho");

        produto.innerHTML = `
            <img src="${disco.capa}" alt="Capa de ${disco.nome}">

            <div class="item-carrinho-info">
                <h3>${disco.nome}</h3>
                <p>${disco.artista}</p>
                <strong>${formatarPreco(disco.preco)}</strong>
            </div>

            <button class="remover-produto" data-indice="${indice}" aria-label="Remover ${disco.nome}">
                <i class="bi bi-trash"></i>
            </button>
        `;

        listaCarrinho.appendChild(produto);
    });

    atualizarResumo();
}

// Calculo os valores do pedido
function atualizarResumo() {
    const subtotal = carrinho.reduce((total, disco) => {
        return total + Number(disco.preco);
    }, 0);

    subtotalElemento.textContent = formatarPreco(subtotal);
    totalElemento.textContent = formatarPreco(subtotal);

    // Salvo a lista atualizada no navegador
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Removo um produto quando o botão correspondente é clicado
listaCarrinho.addEventListener("click", evento => {
    const botao = evento.target.closest(".remover-produto");

    if (!botao) return;

    const indice = Number(botao.dataset.indice);

    carrinho.splice(indice, 1);

    atualizarCarrinho();
});

// Verifico se existe uma sessão demonstrativa
function verificarSessao() {
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado !== "true") {
        alert("Você precisa entrar na sua conta para acessar o carrinho!");
        window.location.href = "conta.html";
        return false;
    }

    return true;
}

// Mostro os produtos assim que a página é carregada
if (verificarSessao()) {
    atualizarCarrinho();
}
