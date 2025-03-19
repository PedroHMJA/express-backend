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