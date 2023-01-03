const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
app.use(express.json()); //express.json (middleware)
app.use(morgan('dev'));  //middleware

// Construindo um middleware próprio
app.use((req, res, next) => {
    console.log('Hola señores ((del medioware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//Iniciando API (route handler)
// realizar a leitura dos dados primeiro
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// GET
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;       //convertendo string para numero
    const tour = tours.find(el => el.id === id);
    //if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'ID Inválido'
        });
    }

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour
        }
    });
}

// POST (se necessário, reiniciar o nodemon)
const createTour = (req, res) => {
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
}

// PATCH (update de propriedades específicas)
const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'ID Inválido'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Tour atualizado...>'
        }
    });
}

// DELETE
const deleteTour =(req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'ID Inválido'
        });
    }

    res.status(204).json({      //204 significa no content
        status: 'success',
        data: null
    });
}

/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour); */

app
    .route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app
    .route('/api/v1/tours/:id')
    .get(getTour).patch(updateTour)
    .delete(deleteTour);

//inicializando servidor
const porta = 8000;
app.listen(porta, () => {
    console.log(`App funcionando na porta ${porta}`);
});
