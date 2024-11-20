const express = require('express');
const validarUsuario = require('../../middleware/validarUsuario');
const router = express.Router();

// Ruta para mostrar coberturas
router.get('/coberturas', validarUsuario, (req, res) => {
    res.render('coberturas'); // Esto renderiza coberturas.ejs
});

router.get('/cargar_coberturas', (req, res) => {
    res.render('carga_coberturas'); 
});

// Ruta para editar cobertura
router.get('/editar_cobertura', (req, res) => {
    res.render('editar_cobertura'); 
});

router.get('/buscar_cobertura', (req, res) => {
    res.render('buscar_cobertura'); 
});

module.exports = router;
