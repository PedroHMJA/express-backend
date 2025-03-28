const express = require("express");
const {Pool} = require("pg");




const app = express();

app.use(express.static('public'));
app.use(express.json());


const conn = new Pool({
    host:"localhost",
    user:"postgres",
    password:"1234",
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

//insert na tabela pessoa
async function inserirPessoa(nome){
    try{
        await conn.query('insert into pessoa(nome) values ($1)',[nome]);
        console.log(`Pessoa ${nome} inserida com sucesso`);
    }catch(error){
        console.error(error);
    }
}

// insert na tabela usuario
async function inserirUsuario(nome, email){
    try{
        await conn.query('insert into usuario(nome,email) values($1,$2)', [nome,email]);
        console.log(`Usuario ${nome}, com o email: ${email}. Inserido com sucesso.`)

    }catch(error){
        console.error(error);
    }
}

async function buscarPessoas() {
    const {rows} = await conn.query('select * from pessoa');
    return rows;
}

async function buscarUsuarios() {
    const {rows} = await conn.query('select * from usuario');
    return rows;
}

async function buscaUsuarioId(id){
    const {row} = await conn.query(`select * from usuario where id ==${id}`);
    return row;
}

app.get('/pessoas', async (req,res) =>{
    let resposta = await buscarPessoas();
    console.log(resposta);
    res.send(resposta);
})

app.get('/usuarios', async (req,res) =>{
    let resposta = await buscarUsuarios();
    console.log(resposta);
    res.send(resposta);
})

app.get('/usuarios/:id', async (req, res) =>{
    const { id } = req.params
    result =  await buscaUsuarioId(id);
    res.send(result);
})

app.post('/inserirUsuario', async (req, res) =>{
    const { nome, email } = req.body;

    await inserirUsuario(nome, email);
    

    res.send({message: 'Usuario adicionado com sucesso!'})
})


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000, http://localhost:3000/");
});
