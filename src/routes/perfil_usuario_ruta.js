const express = require('express');
const router = express.Router();
const perfilUsuarioController = require('../controllers/perfil_usuario_controller');

router.get('/perfil_usuario/:dni', perfilUsuarioController.mostrarPerfil);
router.post('/perfil_usuario/:dni/editar', perfilUsuarioController.editarDatosPersonales);

module.exports = router;
