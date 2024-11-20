const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controllers/usuario');
const validarUsuario = require("../middleware/validarUsuario");

router.post('/cambiar-credencial', validarUsuario, usuarioControlador.cambiarCredencial);
router.post('/validar-credencial', validarUsuario, usuarioControlador.validarCredencial);

module.exports = router;
