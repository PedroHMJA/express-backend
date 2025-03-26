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

function inserirUsuario(){

    const usuario = {
        nome: document.getElementById('name1').value,
        email: document.getElementById('email1').value,
    }
    

    fetch('http://localhost:3000/inserirUsuario', {
        method: 'POST',
        body: JSON.stringify({ usuario })
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Erro ao inserir usuario:', error));
}