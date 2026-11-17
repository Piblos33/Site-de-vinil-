// Elementos dos formulários
const formularioLogin = document.getElementById("form-login");
const formularioCadastro = document.getElementById("form-cadastro");

const botaoCadastro = document.getElementById("ir-cadastro");
const botaoLogin = document.getElementById("ir-login");

// Alterna para o cadastro
botaoCadastro.addEventListener("click", evento => {
    evento.preventDefault();

    formularioLogin.style.display = "none";
    formularioCadastro.style.display = "block";
});

// Volta para o login
botaoLogin.addEventListener("click", evento => {
    evento.preventDefault();

    formularioCadastro.style.display = "none";
    formularioLogin.style.display = "block";
});

// Login demonstrativo
document.getElementById("login-form").addEventListener("submit", evento => {
    evento.preventDefault();

    localStorage.setItem("usuarioLogado", "true");

    alert("Login demonstrativo realizado com sucesso!");

    window.location.href = "index.html";
});

// Cadastro demonstrativo
document.getElementById("cadastro-form").addEventListener("submit", evento => {
    evento.preventDefault();

    const senha = document.getElementById("cadastro-senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais!");
        return;
    }

    localStorage.setItem("usuarioLogado", "true");

    alert("Cadastro demonstrativo realizado com sucesso!");

    window.location.href = "index.html";
});
