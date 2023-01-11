const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

//router.param('id', tourController.checkID);

// requisição endpoint específico
router
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// Aggregation Pipeline
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/') //tourRouter já está dentro de /api/v1/tours
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
