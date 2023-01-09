const mongoose = require('mongoose');

// Construindo esquema e modelo
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour precisa de um nome'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour precisa de uma duração'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour precisa ter um limite'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour precisa de uma dificuldade'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour precisa de um preco'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour precisa de um sumário'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour precisa de uma imagem front'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
