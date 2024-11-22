import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Cria uma conexão com o banco de dados, utilizando a string de conexão fornecida como variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts de uma coleção específica no banco de dados.
export async function getTodosOsPosts() {
    // Seleciona o banco de dados "imersao-insta".
    const db = conexao.db("imersao-insta");
    // Seleciona a coleção "posts" dentro do banco de dados.
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção.
    return colecao.find().toArray()
};
// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost) {
    // Obtém a conexão com o banco de dados
    const db = conexao.db("imersao-insta");
    // Seleciona a coleção "posts" no banco de dados
    const colecao = db.collection("posts");
    // Insere o novo post na coleção e retorna o resultado da operação
    return colecao.insertOne(novoPost);
};
export async function atualizarPost(id, novoPost) {
    // Obtém a conexão com o banco de dados
    const db = conexao.db("imersao-insta");
    // Seleciona a coleção "posts" no banco de dados
    const colecao = db.collection("posts");
    // Insere o novo post na coleção e retorna o resultado da operação
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
};