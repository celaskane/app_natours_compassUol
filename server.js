const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

//NODE_ENV=development nodemon server.js
/* console.log(app.get('env')); */      //consultar ambiente
/* console.log(process.env); */         //consultar variáveis de ambiente

//inicializando servidor
const porta = process.env.PORT || 8000;
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});