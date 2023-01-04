const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//condicionando o uso do middleware morgan apenas para ambiente de desenvolvimento
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //middleware 3rd party
}
app.use(express.json()); //express.json (middleware)
app.use(express.static(`${__dirname}/public`));

// Construindo um middleware próprio
app.use((req, res, next) => {
  console.log('Hola señores ((del medioware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post('/api/v1/tours', createTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour); */

//separando routers (mounting routers)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
