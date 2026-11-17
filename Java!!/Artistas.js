// Elementos da página
const listaArtistas = document.getElementById("artistas-lista");
const quantidadeArtistas = document.getElementById("quantidade-artistas");

const secaoDiscos = document.getElementById("artista-discos");
const nomeArtista = document.getElementById("nome-artista");
const listaDiscos = document.getElementById("lista-discos-artista");
const botaoVoltar = document.getElementById("voltar-artistas");

// Busca os discos cadastrados no catálogo
const discos = window.discos;

// Organiza os discos por artista
const artistas = {};

Object.entries(discos).forEach(([id, disco]) => {
    const artista = disco.artista;

    if (!artistas[artista]) {
        artistas[artista] = [];
    }

    artistas[artista].push({
        id: id,
        ...disco,
    });
});

// Coloca os artistas em ordem alfabética
const nomesArtistas = Object.keys(artistas).sort((a, b) => a.localeCompare(b, "pt-BR"));

// Atualiza a quantidade de artistas
quantidadeArtistas.textContent = `${nomesArtistas.length} artistas no catálogo`;

// Cria a lista de artistas na página
nomesArtistas.forEach(artista => {
    const botao = document.createElement("button");

    botao.classList.add("artista-item");

    botao.innerHTML = `
        <span>${artista}</span>
        <i class="bi bi-arrow-up-right"></i>
    `;

    botao.addEventListener("click", () => {
        mostrarDiscos(artista);
    });

    listaArtistas.appendChild(botao);
});

// Mostra os discos do artista selecionado
function mostrarDiscos(artista) {
    nomeArtista.textContent = artista;

    listaDiscos.innerHTML = "";

    artistas[artista].forEach(disco => {
        const card = document.createElement("article");

        card.classList.add("artista-disco");

        card.innerHTML = `
            <img src="${disco.capa}" alt="Capa de ${disco.nome}">

            <div class="artista-disco-info">
                <h3>${disco.nome}</h3>

                <p>${disco.preco}</p>

                <a href="disco.html?id=${encodeURIComponent(disco.id)}">
                    VER DISCO
                </a>
            </div>
        `;

        listaDiscos.appendChild(card);
    });

    // Esconde a lista e mostra a discografia
    document.querySelector(".artistas-container").style.display = "none";
    secaoDiscos.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// Volta para a lista de artistas
botaoVoltar.addEventListener("click", () => {
    secaoDiscos.style.display = "none";
    document.querySelector(".artistas-container").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
