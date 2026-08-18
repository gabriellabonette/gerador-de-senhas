// ===========================
// GERADOR DE SENHAS
// Desenvolvido por Gabriella Bonette
// ===========================

const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const valorEntropia = document.querySelector('.entropia');

const botaoGerar = document.querySelector('#gerar');
const botaoCopiar = document.querySelector('#copiar');

// ===========================
// BOTÕES + E -
// ===========================

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// ===========================
// CHECKBOXES
// ===========================

checkbox.forEach(item => {
    item.addEventListener("click", geraSenha);
});

// ===========================
// BOTÃO GERAR
// ===========================

botaoGerar.onclick = geraSenha;

// ===========================
// BOTÃO COPIAR
// ===========================

botaoCopiar.onclick = () => {

    if (campoSenha.value === "") {
        alert("Gere uma senha primeiro!");
        return;
    }

    navigator.clipboard.writeText(campoSenha.value);

    botaoCopiar.textContent = "✅ Copiado!";

    setTimeout(() => {
        botaoCopiar.textContent = "📋 Copiar";
    }, 2000);

};

// ===========================
// DIMINUI TAMANHO
// ===========================

function diminuiTamanho() {

    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();

}

// ===========================
// AUMENTA TAMANHO
// ===========================

function aumentaTamanho() {

    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }

    numeroSenha.textContent = tamanhoSenha;
    geraSenha();

}

// ===========================
// GERA SENHA
// ===========================

function geraSenha() {

    let alfabeto = "";

    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    if (alfabeto === "") {

        campoSenha.value = "";
        valorEntropia.textContent = "Selecione pelo menos uma opção.";
        forcaSenha.classList.remove("fraca", "media", "forte");

        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {

        const indice = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[indice];

    }

    campoSenha.value = senha;

    classificaSenha(alfabeto.length);

}

// ===========================
// CLASSIFICA FORÇA
// ===========================

function classificaSenha(tamanhoAlfabeto) {

    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove("fraca", "media", "forte");

    if (entropia > 57) {

        forcaSenha.classList.add("forte");

    } else if (entropia > 35) {

        forcaSenha.classList.add("media");

    } else {

        forcaSenha.classList.add("fraca");

    }

    let dias = Math.floor(
        Math.pow(2, entropia) / (100e6 * 60 * 60 * 24)
    );

    if (dias < 1) {

        valorEntropia.textContent =
            "Um computador pode descobrir essa senha em menos de 1 dia.";

    } else {

        valorEntropia.textContent =
            "Um computador pode levar até " +
            dias.toLocaleString("pt-BR") +
            " dias para descobrir essa senha.";

    }

}

// ===========================
// GERA UMA SENHA AO ABRIR
// ===========================

geraSenha();
