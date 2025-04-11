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


async function buscaPessoa(){
    const id = document.getElementById('id2').value;
    
    const regex = /^[0-9]+$/;

    if(!regex.test(id)){
        return flashMessage('falha','Id invalido');
    }
    try {
        let resposta = await fetch(`http://localhost:3000/pessoas/${id}`);
        let dados = await resposta.json();
        console.table(dados);
    } catch (error) {
        console.error(error);
        flashMessage('falha','Algo deu errado');
    }

    document.getElementById('id2').value = "";

}

async function addPessoa(){
    let nome = document.getElementById('inp2').value;
    
    const regex = /^[A-Za-zÀ-ÿ\s]+$/;
    
    if(!regex.test(nome)){
        return flashMessage('falha', 'Nome invalido')
    }

    const pessoa = { nome }
    
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
}

async function attPessoa(){
    let id =  document.getElementById('id2').value;
    let nome = document.getElementById('inp2').value;
    
    const regex = /^[0-9]+$/;

    if(!regex.test(id)){
        return flashMessage('falha','Id invalido')
    }

    const pessoa = { id, nome };
    try {
        let resposta = await fetch(`http://localhost:3000/atualizarPessoa/${pessoa.id}`,{
            method: 'PUT',
            headers : {
             'Content-Type':'application/json'
            },
            body: JSON.stringify(pessoa)
         })

         let dados = await resposta.json();

         flashMessage('sucesso', dados.message);

         document.getElementById('id2').value = "";
         document.getElementById('inp2').value = "";
    } catch (error) {
        console.error('Erro ao atualizar pessoa', error);
        flashMessage('falha','Algo deu errado');
    }


}

async function deletePessoa(){

    let id = document.getElementById('id2').value;

    const regex = /^[0-9]+$/;
    
    if(!regex.test(id)){
        return flashMessage('falha', 'Id invalido')
    }

    const pessoa = { id };

    try {
        let resposta = await fetch(`http://localhost:3000/deletarPessoa/${pessoa.id}`,{
            method: 'DELETE',
            headers : {
             'Content-Type':'application/json'
            },
            body: JSON.stringify(pessoa)
         });
     
        let dados = await resposta.json();
 
        console.log(dados);
        flashMessage('sucesso',dados.message);
    } catch (error) {
        console.error(error);
        flashMessage('falha','Algo deu errado')
    }

    document.getElementById('id2').value = "";
}

async function addUsuario() {
    let nome = document.getElementById('name1').value;
    let email =  document.getElementById('email1').value;

    const regex = /^[A-Za-zÀ-ÿ0-9\@\_\-]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(nome)){
         return flashMessage('falha','Nome de usuario invalido');
    }
    else if(!regexEmail.test(email)){
        return flashMessage('falha','Email invalido')
    }

    
    const usuario = { nome, email };
try {
    let resposta = await fetch('http://localhost:3000/inserirUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario) 
    })

    let dados = await resposta.json();

    flashMessage('sucesso',dados.message);
    
    document.getElementById('name1').value = "";
    document.getElementById('email1').value = "";
} catch (error) {
    console.error(error);
    flashMessage('falha', 'Algo deu errado')
}

}

async function buscaUsuario(){
    const id = document.getElementById('id1').value;

    const regex = /^[0-9]+$/;

    if(!regex.test(id)){
        return flashMessage('falha','Id invalido');
    }
    
    try {
        let resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
        let dados = await resposta.json();
        console.table(dados);
    } catch (error) {
        console.error(error);
        flashMessage('falha','Algo deu errado');
    }

    document.getElementById('id1').value = "";
    document.getElementById('name1').value = "";
    document.getElementById('email1').value = "";
}

async function attUsuario(){

    let id = document.getElementById('id1').value;
    let nome = document.getElementById('name1').value;
    let email = document.getElementById('email1').value;

    const regexId = /^[0-9]+$/;
    const regexNome = /^[A-Za-zÀ-ÿ0-9\@\_\-]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexId.test(id)){
        return flashMessage('falha','Id invalido');
    }
    else if(!regexNome.test(nome)){
        return flashMessage('falha','Nome invalido');
    }
    else if(!regexEmail.test(email)){
        return flashMessage('falha','Email invalido');
    }
    
    const usuario = { id, nome, email };

    try {
        let resposta = await fetch(`http://localhost:3000/atualizarUsuario/${usuario.id}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(usuario)
        });
    
        let dados = await resposta.json();
        flashMessage('sucesso', dados.message);
    } catch (error) {
        console.error(error);
        flashMessage('falha','Algo deu errado');
    }

    document.getElementById('id1').value = "";
    document.getElementById('name1').value = "";
    document.getElementById('email1').value = "";
}

async function deleteUsuario(){
    const id = document.getElementById('id1').value;

    const regex = /^[0-9]+$/;
    
    if(!regex.test(id)){
        return flashMessage('falha', 'Id invalido')
    }

    const usuario = { id };

    try {
        let resposta = await fetch(`http://localhost:3000/deletarUsuario/${id}`,{
            method:'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(usuario),
        })
    
        let dados = await resposta.json();
    
        flashMessage('sucesso', dados.message);
    } catch (error) {
        console.error(error);
        flashMessage('falha','Algo deu errado');
    }

    document.getElementById('id1').value = "";
}
