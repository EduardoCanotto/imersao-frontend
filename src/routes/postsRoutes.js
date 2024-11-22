import express from "express";
import multer from "multer";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controller/postsController.js";
import cors from "cors"

const corsOp = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
// Configura o armazenamento de arquivos utilizando o multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Indica a pasta 'uploads' como destino
    },
    // Define o nome do arquivo a ser salvo
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliza o nome original do arquivo
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });
// Função para configurar as rotas da aplicação
const routes = (app) => {
    // Habilita o parsing de JSON para as requisições, permitindo que o servidor entenda dados enviados no formato JSON.
    app.use(express.json());
    // Rota GET para a URL /posts. Quando uma requisição GET é feita para essa rota, a função é executada.
    app.use(cors(corsOp));
    app.get("/posts", listarPosts);
    // Rota POST para criar um novo post
    app.post("/posts", postarNovoPost);
    // Rota POST para fazer upload de uma imagem
    app.post("/upload", upload.single("imgm"), uploadImagem); // 'imgm' é o nome do campo do formulário
    
    app.put("/upload/:id", atualizarNovoPost);
};
export default routes;