const { response } = require("express");

function buscarPessoa(){

    var url = '/pessoas';

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
}

function addUsuario() {
    const usuario = {
        nome: document.getElementById('name1').value,
        email: document.getElementById('email1').value,
    };

    fetch('http://localhost:3000/inserirUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Definindo o tipo de conteúdo como JSON
        },
        body: JSON.stringify(usuario) //Enviando o objeto `usuario` diretamente
    })
    .then(response => response.json())
    .then(data => console.log(data)) // Aqui você pode tratar a resposta do backend
    .catch(error => console.error('Erro ao inserir usuario:', error)); // Em caso de erro
}
