// Formulário de contato
const formulario = document.getElementById("contato-form");

// Verifica o envio da mensagem
formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    // Pega os valores preenchidos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const assunto = document.getElementById("assunto").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Confere se todos os campos foram preenchidos
    if (!nome || !email || !assunto || !mensagem) {
        alert("Preencha todos os campos antes de enviar!");
        return;
    }

    // Mostra a confirmação
    alert(`Obrigado pelo contato, ${nome}! Sua mensagem foi preenchida com sucesso.`);

    // Limpa o formulário
    formulario.reset();
});
