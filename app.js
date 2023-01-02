const express = require('express');

const app = express();

// Iniciando um servidor

app.get('/', (req, res) => {    //definindo rota
    //200 para ok
    res.status(200).send('Hola señores ((del servidor');
});

const porta = 8000;
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});
