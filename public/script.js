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

    document.getElementById('inp2').value = "";
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

async function carregarDadosUsuarios() {
    try {
      const resposta = await fetch('http://localhost:3000/usuarios');
      const dados = await resposta.json();

      const tabela = document.getElementById('apiTable').getElementsByTagName('tbody')[0];

      dados.forEach(item => {
        const linha = tabela.insertRow();
        const celulaId = linha.insertCell(0);
        const celulaNome = linha.insertCell(1);
        const celulaEmail = linha.insertCell(2);

        celulaId.innerText = item.id;
        celulaNome.innerText = item.nome;
        celulaEmail.innerText = item.email;
      });
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
    }
  }
  async function carregarDadosPessoas() {
    try {
      const resposta = await fetch('http://localhost:3000/pessoas');
      const dados = await resposta.json();

      const tabela = document.getElementById('apiTable').getElementsByTagName('tbody')[0];

      dados.forEach(item => {
        const linha = tabela.insertRow();
        const celulaId = linha.insertCell(0);
        const celulaNome = linha.insertCell(1);

        celulaId.innerText = item.id;
        celulaNome.innerText = item.nome;

      });
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
    }
  }
  async function carregarDadoUnicoUsuario() {
    try {
      const idUsuario = localStorage.getItem('idUsuario');
      console.log(idUsuario);
      const resposta = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
      const dados = await resposta.json();
      console.log(dados)
      const tabela = document.getElementById('apiTable').getElementsByTagName('tbody')[0];

      dados.forEach(item => {
        const linha = tabela.insertRow();
        const celulaId = linha.insertCell(0);
        const celulaNome = linha.insertCell(1);
        const celulaEmail = linha.insertCell(2);

        celulaId.innerText = item.id;
        celulaNome.innerText = item.nome;
        celulaEmail.innerText = item.email;
      });
      localStorage.clear();
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
      localStorage.clear();
    }
    
  }
  async function carregarDadoUnicoPessoa() {
    try {
      const idPessoa = localStorage.getItem('idPessoa');
      const resposta = await fetch(`http://localhost:3000/pessoas/${idPessoa}`);
      const dados = await resposta.json();

      const tabela = document.getElementById('apiTable').getElementsByTagName('tbody')[0];

      dados.forEach(item => {
        const linha = tabela.insertRow();
        const celulaId = linha.insertCell(0);
        const celulaNome = linha.insertCell(1);

        celulaId.innerText = item.id;
        celulaNome.innerText = item.nome;

      });
    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
    }
    localStorage.clear();
  }


function armazenaId(){
    const idUsuario = document.getElementById('id1').value;
    const idPessoa = document.getElementById('id2').value;
    localStorage.setItem('idUsuario', idUsuario);
    localStorage.setItem('idPessoa', idPessoa);
}
