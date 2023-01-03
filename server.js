const app = require('./app')

//inicializando servidor
const porta = 8000;
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});