var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.getHomePage);

// Ruta para el sobre nosotros
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Acerca de Nosotros' });
});

// Ruta para contacto
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contacto' });
});

module.exports = router;