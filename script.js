const campoSenha = document.getElementById("senha");
const botaoGerar = document.getElementById("gerar");
const botaoCopiar = document.getElementById("copiar");

const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const mensagem = document.getElementById("mensagem");


tamanho.addEventListener("input", function () {
    valorTamanho.textContent = tamanho.value;
});


function gerarSenha() {

    let caracteres = "";

    if (maiusculas.checked) {
        caracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (minusculas.checked) {
        caracteres += "abcdefghijklmnopqrstuvwxyz";
    }

    if (numeros.checked) {
        caracteres += "0123456789";
    }

    if (simbolos.checked) {
        caracteres += "!@#$%&*+-=?";
    }

    if (caracteres.length === 0) {
        campoSenha.value = "";
        mensagem.textContent = "Selecione pelo menos uma opção.";
        return;
    }

    let senhaGerada = "";

    for (let i = 0; i < tamanho.value; i++) {

        const indice = Math.floor(
            Math.random() * caracteres.length
        );

        senhaGerada += caracteres[indice];
    }

    campoSenha.value = senhaGerada;

    mensagem.textContent = "";
}


botaoGerar.addEventListener("click", gerarSenha);


botaoCopiar.addEventListener("click", async function () {

    if (campoSenha.value === "") {
        mensagem.textContent = "Gere uma senha primeiro.";
        return;
    }

    try {

        await navigator.clipboard.writeText(campoSenha.value);

        mensagem.textContent = "Senha copiada!";

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível copiar a senha.";

    }

});


gerarSenha();
