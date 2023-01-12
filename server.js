const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// MongoClient constructor
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Conexão com Banco de Dados OK');
  });

//NODE_ENV=development nodemon server.js
/* console.log(app.get('env')); */ //consultar ambiente
/* console.log(process.env); */ //consultar variáveis de ambiente

//inicializando servidor
const porta = process.env.PORT || 8000;
app.listen(porta, () => {
  console.log(`App funcionando na porta ${porta}`);
});

// Tratamento de erros
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  process.exit();
});

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
