const express = require('express');
const router = express.Router();
const CoberturasController = require('../controllers/coberturas_controller'); 
//const validarUsuario = require('../middleware/validarUsuario');

router.post('/insertar-cobertura', CoberturasController.agregarCobertura);
router.put('/editar-cobertura', CoberturasController.editarCobertura);
router.post('/obtener-cobertura/:id_suma', CoberturasController.obtenerCoberturas);

module.exports = router;