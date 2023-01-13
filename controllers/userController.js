const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//GET
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Esse route ainda não foi definido',
  });
};

//POST
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Esse route ainda não foi definido',
  });
};

//PATCH
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Esse route ainda não foi definido',
  });
};

//DELETE
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Esse route ainda não foi definido',
  });
};
