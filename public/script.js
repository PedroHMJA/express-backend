function flashMessage(tipo, mensagem){
    const container = document.getElementById('message');
    const message = document.createElement('div');

    message.classList.add('mensagem');
    if(tipo === 'sucesso'){
        message.classList.add('sucesso');
    } else if (tipo === 'falha'){
        message.classList.add('falha');
    }

    message.textContent = mensagem;
    container.appendChild(message);

    setTimeout(() => {
        container.removeChild(message);
    }, 3000);
}


function buscaPessoa(){
    const id = document.getElementById('id2').value;
    fetch(`http://localhost:3000/pessoas/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });

        document.getElementById('id2').value = "";
        document.getElementById('inp2').value = "";
}

async function addPessoa(){
    const pessoa = {
        nome: document.getElementById('inp2').value,
    };
    try {
        let resposta = await fetch('http://localhost:3000/inserirPessoa',{
            method: 'POST',
            headers : {
            'Content-Type':'application/json'
            },
            body: JSON.stringify(pessoa)
        });
        let dados = await resposta.json();
        flashMessage('sucesso', dados.message);
    } catch (error) {
        flashMessage('falha', 'Algo deu errado')
    }


    document.getElementById('id2').value = "";
    document.getElementById('inp2').value = "";
}

function attPessoa(){
    const pessoa = {
        id: document.getElementById('id2').value,
        nome: document.getElementById('inp2').value,
    };
    fetch(`http://localhost:3000/atualizarPessoa/${pessoa.id}`,{
           method: 'PUT',
           headers : {
            'Content-Type':'application/json'
           },
           body: JSON.stringify(pessoa)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro ao atualizar pessoa', error))
        
        document.getElementById('id2').value = "";
        document.getElementById('inp2').value = "";
}

function deletePessoa(){
    const pessoa = {
        id: document.getElementById('id2').value,
        nome: document.getElementById('inp2').value,
    };
    fetch(`http://localhost:3000/deletarPessoa/${pessoa.id}`,{
           method: 'DELETE',
           headers : {
            'Content-Type':'application/json'
           },
           body: JSON.stringify(pessoa)
        })
        .then(response=>response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro ao deletar pessoa', error))
        
        document.getElementById('id2').value = "";
        document.getElementById('inp2').value = "";
        
}

//função da pagina web
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
    
    document.getElementById('name1').value = "";
    document.getElementById('email1').value = "";
}

function buscaUsuario(){
    const id = document.getElementById('id1').value;

    fetch(`http://localhost:3000/usuarios/${id}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

    document.getElementById('id1').value = "";
    document.getElementById('name1').value = "";
    document.getElementById('email1').value = "";
}

function attUsuario(){
    
    const usuario = {
        id: document.getElementById('id1').value,
        nome: document.getElementById('name1').value,
        email: document.getElementById('email1').value,
    }
    fetch(`http://localhost:3000/atualizarUsuario/${usuario.id}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

function deleteUsuario(){
    const id = document.getElementById('id1').value;

    fetch(`http://localhost:3000/deletarUsuario/${id}`,{
        method:'DELETE',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

    document.getElementById('id1').value = "";
}
