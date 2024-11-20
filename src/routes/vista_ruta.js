const express = require('express');
const router = express.Router();
const vistaControlador = require('../controllers/vistaController');
const validarUsuario = require('../middleware/validarUsuario');
const controller = new vistaControlador();

router.get('/vistaClientes/archivados', validarUsuario, controller.mostrarClientesArchivados);
router.get('/vistaClientes', validarUsuario, controller.mostrarLista); 
router.get('/perfil_usuario/:id', validarUsuario, controller.obtenerClienteID); //al final se cambió a ID
router.post('/archivar_cliente/:id', validarUsuario, controller.archivarCliente.bind(controller));
router.put('/vistaClientes/:id/desarchivar', validarUsuario, controller.desarchivarCliente.bind(controller));

module.exports = router;