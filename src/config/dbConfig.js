import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
  // Inicializa a variável para armazenar o cliente MongoDB
  let mongoClient;

  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);
    // Informa ao usuário que a conexão está sendo estabelecida
    console.log('Conectando ao cluster do banco de dados...');
    // Tenta estabelecer a conexão com o banco de dados
    await mongoClient.connect();
    // Informa ao usuário que a conexão foi estabelecida com sucesso
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para uso em outras partes do código
    return mongoClient;
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a conexão
    console.error('Falha na conexão com o banco!', erro);
    // Encerra o processo em caso de erro, evitando que o programa continue com a conexão falhada
    process.exit();
  }
};