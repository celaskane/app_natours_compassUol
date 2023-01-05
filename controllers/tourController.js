const Tour = require('../models/tourModel');

/* //Iniciando route handler (realizar a leitura dos dados primeiro)
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); */

// GET
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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

// POST
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
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
