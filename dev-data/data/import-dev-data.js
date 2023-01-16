const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Conexão com o banco de dados OK'));

// Lendo o arquivo json
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// Importando dados do json no banco de dados
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Dados carregados com sucesso!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Apagando os dados
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Dados apagados com sucesso!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Condicionando import e delete (node dev-data/data/import-dev-data.js --import ou --delete)
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
