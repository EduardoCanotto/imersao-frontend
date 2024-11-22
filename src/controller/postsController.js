import fs from "fs";
import { atualizarPost, criarPost, getTodosOsPosts } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../servives/geminiService.js";
// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados utilizando a função auxiliar
  const posts = await getTodosOsPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON
  res.status(200).json(posts);
};

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Extrai as informações do novo post do corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função auxiliar para criar o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na requisição" });
  };
};

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um novo objeto de post com a descrição vazia e a URL da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Corrigido para originalname
    alt: ""
  };
  try {
    // Chama a função auxiliar para criar o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Gera um novo nome para a imagem com base no ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Move a imagem para o diretório de uploads com o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição" });
  };
};
export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  const post = {
    imgUrl: urlImagem,
    descricao: req.body.descricao,
    alt: req.body.alt
  }
  try {

    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imageBuffer)
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    }
    const postCriado = await atualizarPost(id, post);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
    res.status(200).json(postCriado);

  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({ "Erro": "Falha na requisição" });
  };
};