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

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour precisa de um nome'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour precisa de um preco'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

//NODE_ENV=development nodemon server.js
/* console.log(app.get('env')); */ //consultar ambiente
/* console.log(process.env); */ //consultar variáveis de ambiente

//inicializando servidor
const porta = process.env.PORT || 8000;
app.listen(porta, () => {
  console.log(`App funcionando na porta ${porta}`);
});
