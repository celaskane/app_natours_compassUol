const Tour = require('../models/tourModel');

/* //Iniciando route handler (realizar a leitura dos dados primeiro)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); */

//middleware functions

//valida nome ou preço
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Falta nome ou preco',
    });
  }
  next();
};

// GET
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    /* results: tours.length,
    data: {
      tours,
    }, */
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convertendo string para numero

  /* const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  }); */
};

// POST (se necessário, reiniciar o nodemon)
exports.createTour = (req, res) => {
  res.status(201).json({
    //201 significa criado
    status: 'success',
    /* data: {
      tour: newTour,
    }, */
  });
};

// PATCH (update de propriedades específicas)
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Tour atualizado...>',
    },
  });
};

// DELETE
exports.deleteTour = (req, res) => {
  res.status(204).json({
    //204 significa no content
    status: 'success',
    data: null,
  });
};
