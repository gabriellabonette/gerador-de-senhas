const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const senha = document.getElementById("senha");
const gerar = document.getElementById("gerar");
const copiar = document.getElementById("copiar");
const mensagem = document.getElementById("mensagem");


// Atualiza o número do tamanho da senha
tamanho.addEventListener("input", () => {
    valorTamanho.textContent = tamanho.value;
});


// Gera a senha
function gerarSenha() {

    let caracteres = "";

    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const numerosDisponiveis = "0123456789";
    const simbolosDisponiveis = "!@#$%&*?+-_=";


    if (maiusculas.checked) {
        caracteres += letrasMaiusculas;
    }

    if (minusculas.checked) {
        caracteres += letrasMinusculas;
    }

    if (numeros.checked) {
        caracteres += numerosDisponiveis;
    }

    if (simbolos.checked) {
        caracteres += simbolosDisponiveis;
    }


    // Verifica se alguma opção foi selecionada
    if (caracteres.length === 0) {

        senha.value = "";

        mensagem.textContent =
            "⚠️ Selecione pelo menos uma opção.";

        return;
    }


    let novaSenha = "";

    for (let i = 0; i < Number(tamanho.value); i++) {

        const indice =
            Math.floor(Math.random() * caracteres.length);

        novaSenha += caracteres[indice];
    }


    senha.value = novaSenha;

    mensagem.textContent = "✅ Senha gerada com sucesso!";
}


// Botão gerar
gerar.addEventListener("click", gerarSenha);


// Copiar senha
copiar.addEventListener("click", async () => {

    if (senha.value === "") {

        mensagem.textContent =
            "⚠️ Gere uma senha primeiro.";

        return;
    }


    try {

        await navigator.clipboard.writeText(senha.value);

        mensagem.textContent =
            "📋 Senha copiada!";

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível copiar a senha.";

    }

});


// Gera uma senha automaticamente ao abrir a página
gerarSenha();
