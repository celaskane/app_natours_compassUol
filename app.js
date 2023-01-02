const express = require('express');
const fs = require('fs');
const app = express();

// Iniciando um servidor

/* app.get('/', (req, res) => {    //definindo rota (método http request)
    //200 para ok (default) 404 para not found
    res
        .status(200)
        .json({mensagem: 'Hola señores ((del servidor', app: 'Natures'});
});

app.post('/', (req, res) => {
    res.send('Podes postar neste endpoint');
}) */


//Iniciando API: GET (route handler)
// realizar a leitura dos dados primeiro
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

const porta = 8000;         //inicializando servidor
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});
