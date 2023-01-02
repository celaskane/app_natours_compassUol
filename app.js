const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //express.json (middleware)

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

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;       //convertendo string para numero
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'ID Inválido'
        })
    }

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour
        }
    });
});

// POST (se necessário, reiniciar o nodemon)
app.post('/api/v1/tours', (req, res) => {
    //middleware
    //console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`, 
        JSON.stringify(tours), 
        err => {
            res.status(201).json({      //201 significa criado
                status: 'success',
                data: {
                    tour: newTour
                }
            });
        }
    );
});

const porta = 8000;         //inicializando servidor
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});
