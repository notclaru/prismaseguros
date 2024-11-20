const express = require('express');
const router = express.Router();
const SumaController = require('../controllers/suma_controller'); 
//const validarUsuario = require('../middleware/validarUsuario');

router.post('/insertar-suma', SumaController.agregarSuma);

router.get('/obtener-suma/:id_anio', SumaController.obtenerSumaCliente);
/*router.get('/obtener-suma-cliente/:id_anio', SumaController.obtenerSumaCliente);*/


router.put('/editar-suma/:id_suma', SumaController.editarSuma);


module.exports = router;