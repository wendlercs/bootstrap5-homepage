$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#endereço").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#estado").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereço").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#estado").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereço").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#estado").val(dados.uf);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});

/*'use strict';


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
/*Digitos totais ou caso tenha letra (eNumero) de um CEP, caso contrario retorna error*/

/*const pesquisarCep = async () => {
    limparFormulario();



    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereço = await dados.json();
        /* Vou pegar os dados da promeça fetch, armazena os dados no json e ja pega todo o cep digitado*/
/*        if (endereço.hasOwnProperty('erro')) {
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
    .addEventListener('focusout', pesquisarCep);*/






