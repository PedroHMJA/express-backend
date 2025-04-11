const express = require("express");
const {Pool} = require("pg");

const app = express();
app.use(express.static('public'));
app.use(express.json());

const conn = new Pool({
    host:"localhost",
    user:"postgres",
    password:"admin",
    database:"postgres",
    port: 5432,
});

conn.connect()
    .then(() => {
        console.log("Conectado ao PostgreSQL");
        initBanco();
    })
    .catch(err => console.error("Erro de conexão", err));

function initBanco(){
    const queries = [
        `create table if not exists usuario(
            id serial primary key,
            nome text,
            email text
        );`,
        `create table if not exists pessoa(
            id serial primary key,
            nome text
        );`
        ];

       queries.forEach(query => {
        try{
            conn.query(query);
            console.log('Tabelas criadas com sucesso!')
        } catch(error){
            console.log("Erro ao criar tabelas", error)
        }}); 
}

async function inserirPessoa(nome){
    try{
        await conn.query('insert into pessoa(nome) values ($1)',[nome]);
        console.log(`Pessoa inserida com sucesso`);
    }catch(error){
        console.error(error);
    }
}
async function buscarPessoas() {
    try {
        
    } catch (error) {
        console.error(error);
    }
    const {rows} = await conn.query('select * from pessoa');
    return rows;
}
async function buscarPessoaId(id){
    try {
        const { rows } = await conn.query(`select * from pessoa where id = ${id}`);
        return rows;
    } catch (error) {
        console.error(error);
    }
    
}
async function atualizaPessoa(id, nome){
    try {
        await conn.query('update pessoa set nome = $1 where id = $2',[nome,id]);
        console.log("Pessoa atualizada com sucesso");
    } catch (error) {
        console.error(error);
    }
}
async function deletaPessoa(id){
    try {
        await conn.query(`delete from pessoa where id = ${id}`);
        console.log("Pessoa deletada com sucesso");
    } catch (error) {
        console.error(error);
    }
}


async function inserirUsuario(nome, email){
    try{
        await conn.query('insert into usuario(nome,email) values($1,$2)', [nome,email]);
        console.log('Usuario inserido com sucesso.')

    }catch(error){
        console.error(error);
    }
}
async function buscarUsuarios() {
    const {rows} = await conn.query('select * from usuario');
    return rows;
}
async function buscaUsuarioId(id){
    try {
        const {rows} = await conn.query(`select * from usuario where id = ${id}`);
        return rows;    
    } catch (error) {
        console.error(error);
    }
    
}
async function atualizaUsuario(id, nome, email){
    try {
        await conn.query('update usuario set nome = $1, email = $2 where id = $3',[nome, email, id]);
        console.log(`Usuario ${id} atualizado com sucesso`);
    } catch (error) {
        console.error(error);
    }

}
async function deletaUsuario(id){
    try {
        await conn.query(`delete from usuario where id = ${id}`);
        console.log("Usuario deletado com sucesso");
    } catch (error) {
        console.error(error);
        console.log("Erro ao deletar usuario");
    }
}

app.get('/pessoas', async (req,res) =>{
    let resposta = await buscarPessoas();
    res.send(resposta);
})

app.get('/pessoas/:id', async (req, res)=>{
    const id = req.params.id;
    res.send(await buscarPessoaId(id));
})

app.post('/inserirPessoa',async (req,res)=>{
    const { nome } = req.body;
    await inserirPessoa(nome);
    res.send({message:"Pessoa adicionada com sucesso"});
})

app.put('/atualizarPessoa/:id', async (req,res)=>{
    const { nome } = req.body;
    await atualizaPessoa(req.params.id, nome);
    res.send({message:"Pessoa atualizada com sucesso"});
})
app.delete('/deletarPessoa/:id', async (req,res)=>{
    await deletaPessoa(req.params.id);
    res.send({message:"Pessoa deletada com sucesso"});
})

app.get('/usuarios', async (req,res) =>{
    let resposta = await buscarUsuarios();
    res.send(resposta);
})

//busca usuario por id
app.get('/usuarios/:id', async (req, res) =>{
    const id = req.params.id;
    res.send(await buscaUsuarioId(id));
   
})

//insere um novo usuario
app.post('/inserirUsuario', async (req, res) =>{
    const { nome, email } = req.body;
    await inserirUsuario(nome, email);
    res.send({message: 'Usuario adicionado com sucesso!'});
})
//atualiza um usuario ja existente
app.put('/atualizarUsuario/:id', async (req, res) => {
    const id = req.params.id;
    await atualizaUsuario(id, req.body.nome, req.body.email);
    res.send({message:"Usuario atualizado com sucesso"});
})
//deleta um usuario
app.delete('/deletarUsuario/:id', async (req,res) =>{
    const id = req.params.id;
    await deletaUsuario(id);
    res.send({message:"Usuario deletado com sucesso"});
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000, http://localhost:3000/");
});
