/*
========================================
PARTE 4: FILTRO INTERATIVO
Pesquisa de produtos em tempo real
========================================
*/

// Pego o campo de pesquisa e os cartões dos discos
const campoPesquisa = document.getElementById("filtro-discos");
const produtos = document.querySelectorAll(".products-container .product-card");
const mensagemVazia = document.getElementById("nenhum-resultado");

// Verifico se os elementos necessários existem
if (campoPesquisa && mensagemVazia) {
    // Detecto quando o usuário digita alguma coisa
    campoPesquisa.addEventListener("input", () => {
        // Transformo o texto digitado em letras minúsculas
        const pesquisa = campoPesquisa.value.toLowerCase().trim();

        // Conto quantos produtos continuam visíveis
        let produtosEncontrados = 0;

        // Percorro todos os cartões disponíveis
        produtos.forEach(produto => {
            // Recupero o nome e o artista de cada disco
            const nome = produto.querySelector("h3").textContent.toLowerCase();
            const artista = produto.querySelector("p").textContent.toLowerCase();

            // Verifico se o nome ou o artista correspondem à pesquisa
            const corresponde = nome.includes(pesquisa) || artista.includes(pesquisa);

            // Exibo ou escondo o cartão de acordo com o resultado
            produto.style.display = corresponde ? "" : "none";

            // Atualizo a quantidade de resultados encontrados
            if (corresponde) {
                produtosEncontrados++;
            }
        });

        // Exibo uma mensagem caso nenhum disco seja encontrado
        mensagemVazia.style.display = produtosEncontrados === 0 ? "block" : "none";
    });
}
