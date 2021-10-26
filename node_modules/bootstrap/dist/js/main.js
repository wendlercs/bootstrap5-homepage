'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereço').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereço) => {
    document.getElementById('endereço').value = endereço.logradouro;
    document.getElementById('bairro').value = endereço.bairro;
    document.getElementById('cidade').value = endereço.localidade;
    document.getElementById('estado').value = endereço.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

/* Digitos totais ou caso tenha letra (eNumero) de um CEP, caso contrario retorna error*/

const pesquisarCep = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereço = await dados.json();
        /* Vou pegar os dados da promeça fetch, armazena os dados no json e ja pega todo o cep digitado*/
        if (endereço.hasOwnProperty('erro')) {
            document.getElementById('endereço').value = 'CEP não encontrado';
        }
        else {
            preencherFormulario(endereço);
        }
    }   
    else{
        document.getElementById('endereço').value = 'CEP incorreto';
    }
}

document.getElementById('cep')
    .addEventListener('focusout', pesquisarCep);
