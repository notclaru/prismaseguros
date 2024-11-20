const express = require('express');
const router = express.Router();
const MarcasController = require('../controllers/marcas_controller'); 

router.get('/obtener-marcas', MarcasController.obtenerMarcas);

router.post('/crear-marca',  MarcasController.agregarMarca);

module.exports = router;
