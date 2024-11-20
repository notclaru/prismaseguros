const express = require('express');
const router = express.Router();
// const AniosController = require('../controllers/anios_controller');  // comente el controlador para probar
const ModelosAniosModelo = require('../models/modeloanios_models'); // uso el modelo desde acá 
//const validarUsuario = require('../middleware/validarUsuario');

router.get('/obtener-anios/:id_modelos', async (req, res) => {
    const { id_modelos } = req.params; 

    // log para verificar los valores recibidos
    console.log('ID Modelos:', id_modelos);

    try {
        const consultaAnios = await ModelosAniosModelo.obtenerAniosPorModelo(id_modelos);

        // log de los datos obtenidos
        console.log('Datos obtenidos:', consultaAnios);
        res.json(consultaAnios);
    } catch (err) {
        // log de error 
        console.error('Error al obtener anios:', err.message);
        res.status(500).json({ error: 'Error al obtener anios' });
    }
});

router.post('/crear-anio/:id_modelos', async (req, res) => {
    const id_modelos = req.params.id_modelos; 
    const { anio } = req.body;
    try {
        const resultado = await ModelosAniosModelo.insertarAnios(id_modelos, anio);
        // res.status(201).json(resultado); 
        // te lo comente para y puse esta linea para obtener el idddddd sino me traia undefined
        res.status(201).json({ id_anio: resultado.insertId }); 
    } catch (err) {
        console.error('Error al agregar anio:', err.message);
        res.status(500).json({ error: 'Error al agregar anio' });
    }
});
  
module.exports = router;
