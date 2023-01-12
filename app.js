const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//separando routers (mounting routers)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Rotas não existentes (precisa estar depois dos routers)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Middleware para Tratamento Global de Erros
app.use(globalErrorHandler);

module.exports = app;
