const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/ver_vehiculos_controlador');
const validarUsuario = require('../middleware/validarUsuario');

router.get('/ver_vehiculo/:id_cliente', validarUsuario, vehiculosController.obtenerVehiculosCliente);
router.post('/ver_vehiculo/:id_cliente/editar_vehiculo', validarUsuario, vehiculosController.editarVehiculo);


module.exports = router;
