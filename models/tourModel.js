const mongoose = require('mongoose');

// Construindo esquema e modelo
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour precisa de um nome'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour precisa de um preco'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
