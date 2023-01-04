const fs = require('fs');

//Iniciando route handler (realizar a leitura dos dados primeiro)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//middleware functions
//valida ID
exports.checkID = (req, res, next, val) => {
  console.log(`ID da tour: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID Inválido',
    });
  }
  next();
};

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
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convertendo string para numero
  const tour = tours.find((el) => el.id === id);
  //if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID Inválido',
    });
  }

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour,
    },
  });
};

// POST (se necessário, reiniciar o nodemon)
exports.createTour = (req, res) => {
  //middleware
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        //201 significa criado
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

// PATCH (update de propriedades específicas)
exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'ID Inválido',
    });
  }

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
