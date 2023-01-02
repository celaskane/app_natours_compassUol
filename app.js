const express = require('express');

const app = express();

// Iniciando um servidor

app.get('/', (req, res) => {    //definindo rota (método http request)
    //200 para ok (default) 404 para not found
    res
        .status(200)
        .json({mensagem: 'Hola señores ((del servidor', app: 'Natures'});
});

app.post('/', (req, res) => {
    res.send('Podes postar neste endpoint');
})

const porta = 8000;
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});
