/*
========================================
PARTE 5: GERENCIADOR DE TAREFAS
Lista de desejos com localStorage
========================================
*/

console.log("Desejos.js carregado!");
console.log("Formulário encontrado:", document.getElementById("form-desejos"));

// Pego os elementos que vou utilizar na lista
const formularioDesejos = document.getElementById("form-desejos");
const campoDesejo = document.getElementById("nome-desejo");
const listaDesejos = document.getElementById("itens-desejos");
const mensagemListaDesejos = document.getElementById("lista-vazia");

// Recupero os desejos que já foram salvos no navegador
let desejos = JSON.parse(localStorage.getItem("desejosVinyl")) || [];

// Função responsável por salvar a lista
function salvarDesejos() {
    localStorage.setItem("desejosVinyl", JSON.stringify(desejos));
}

// Função responsável por atualizar os itens na tela
function atualizarLista() {
    listaDesejos.innerHTML = "";

    mensagemListaDesejos.style.display = desejos.length === 0 ? "block" : "none";

    desejos.forEach((desejo, indice) => {
        const item = document.createElement("li");

        const nome = document.createElement("span");
        nome.textContent = desejo.nome;

        if (desejo.concluido) {
            nome.classList.add("desejo-concluido");
        }

        // Botão para marcar como adquirido
        const botaoConcluir = document.createElement("button");
        botaoConcluir.type = "button";
        botaoConcluir.textContent = desejo.concluido ? "DESFAZER" : "ADQUIRIDO";

        botaoConcluir.addEventListener("click", () => {
            desejos[indice].concluido = !desejos[indice].concluido;

            salvarDesejos();
            atualizarLista();
        });

        // Botão para remover o desejo
        const botaoRemover = document.createElement("button");
        botaoRemover.type = "button";
        botaoRemover.textContent = "REMOVER";

        botaoRemover.addEventListener("click", () => {
            desejos.splice(indice, 1);

            salvarDesejos();
            atualizarLista();
        });

        item.appendChild(nome);
        item.appendChild(botaoConcluir);
        item.appendChild(botaoRemover);

        listaDesejos.appendChild(item);
    });
}

// Detecto quando o formulário é enviado
if (formularioDesejos && campoDesejo && listaDesejos && mensagemListaDesejos) {
    formularioDesejos.addEventListener("submit", evento => {
        // Impede o comportamento padrão do formulário
        evento.preventDefault();

        const nomeDisco = campoDesejo.value.trim();

        if (nomeDisco === "") {
            return;
        }

        // Adiciono o novo disco à lista
        desejos.push({
            nome: nomeDisco,
            concluido: false,
        });

        salvarDesejos();
        atualizarLista();

        campoDesejo.value = "";
    });

    // Mostro os desejos salvos ao carregar a página
    atualizarLista();
} else {
    console.error("Não encontrei os elementos da lista de desejos!");
}
