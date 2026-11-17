/*
========================================
PARTE 2: MODAL E CTA
Eventos, prevenção de padrão e validação
========================================
*/

// Pego o ID do disco que foi selecionado na página
const parametros = new URLSearchParams(window.location.search);
const idDisco = parametros.get("id");

// Aqui ficam os elementos que vou atualizar com as informações
const capa = document.getElementById("disco-capa");
const nome = document.getElementById("disco-nome");
const artista = document.getElementById("disco-artista");
const preco = document.getElementById("disco-preco");
const descricao = document.getElementById("disco-descricao");

// Organizo as informações de cada disco para facilitar na hora de encontrar
const discos = window.discos;

// Procuro qual disco foi selecionado
const discoSelecionado = discos[idDisco];

// Verifico se encontrei o produto e atualizo as informações
if (discoSelecionado) {
    capa.src = discoSelecionado.capa;
    capa.alt = "Capa de " + discoSelecionado.nome;

    nome.textContent = discoSelecionado.nome;
    artista.textContent = discoSelecionado.artista;
    preco.textContent = discoSelecionado.preco;
    descricao.textContent = discoSelecionado.descricao;
} else {
    // Caso não encontre, mostro uma mensagem no lugar das informações
    nome.textContent = "Disco não encontrado";
    artista.textContent = "";
    preco.textContent = "";
    descricao.textContent = "Não conseguimos encontrar esse produto.";

    capa.style.display = "none";
}

// Pego os elementos que vou utilizar para controlar o modal
const botaoCarrinho = document.getElementById("adicionar-carrinho");
const modal = document.getElementById("modal-login");
const fecharModal = document.getElementById("fechar-modal");

// Verifico se os elementos existem antes de adicionar os eventos
if (botaoCarrinho && modal && fecharModal) {
    // Verifico o clique no botão de adicionar ao carrinho
    botaoCarrinho.addEventListener("click", evento => {
        // Evito o comportamento padrão do botão
        evento.preventDefault();

        // Confiro se existe uma sessão demonstrativa
        const usuarioLogado = localStorage.getItem("usuarioLogado");

        // Caso não esteja logado, exibo o modal
        if (usuarioLogado !== "true") {
            modal.classList.add("modal-ativo");
            return;
        }

        // Confiro se o disco foi encontrado
        if (!discoSelecionado) {
            alert("Não foi possível encontrar esse disco.");
            return;
        }

        // Recupero os discos que já estão no carrinho
        const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        // Verifico se o disco já foi adicionado
        const jaExiste = carrinho.some(item => item.id === idDisco);

        if (jaExiste) {
            alert("Esse disco já está no seu carrinho!");
            return;
        }

        // Converto o preço para número
        const precoNumerico = Number(
            discoSelecionado.preco.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
        );

        // Adiciono o disco ao carrinho
        carrinho.push({
            id: idDisco,
            nome: discoSelecionado.nome,
            artista: discoSelecionado.artista,
            preco: precoNumerico,
            capa: discoSelecionado.capa,
        });

        // Salvo o carrinho no armazenamento local do navegador
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert("Disco adicionado ao carrinho!");
    });

    // Fecho o modal pelo botão de fechar
    fecharModal.addEventListener("click", () => {
        modal.classList.remove("modal-ativo");
    });

    // Também permito fechar clicando fora da janela
    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            modal.classList.remove("modal-ativo");
        }
    });
}
