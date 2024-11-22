import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Inicializa o framework Express para criar a aplicação web.
const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log("Servidor escutando..");
});


// function buscarPostPorId(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     });
// };

// app.get("/posts/:id", (req, res) => {
//     const index = buscarPostPorId(req.params.id);
//     if (index.length !== -1) {
//         res.status(404).send("Erro 404: Post não encontrado");
//     } else {
//         res.status(200).json(posts[index]);
//     }
// }); // Rota para buscar por ID

// app.get("/posts/search/:keyword", (req, res) => {
//     const keyword = req.params.keyword.toLowerCase();
//     const filteredPosts = posts.filter(post =>
//         post.descricao.toLowerCase().includes(keyword)
//     );
//     if (filteredPosts.length === 0) {
//         res.status(404).send("Erro 404: Palavra Chave não encontrada");
//     } else {
//         res.status(200).json(filteredPosts);
//     }
// }); // Rota para buscar por palavra chave

