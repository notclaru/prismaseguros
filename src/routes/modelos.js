const express = require('express');
const router = express.Router();
const ModelosController = require('../controllers/modelos_controller'); 
//const validarUsuario = require('../middleware/validarUsuario');

//obtengo modelos segun la marca y tipo(auto om oto)
router.get('/obtener-modelos/:id_marcas', async (req, res) => {
    console.log("obtener modelos");
    
    const { id_marcas } = req.params; 
    const tipo = req.query.tipo;

    console.log('ID Marca:', id_marcas);
    console.log('Tipo:', tipo);

    try {
        const consultaModelos = await ModelosController.obtenerPorMarcaYTipo(id_marcas, tipo);

        console.log('Datos obtenidos:', consultaModelos);
        res.json(consultaModelos);
    } catch (err) {
        console.error('Error al obtener modelos:', err.message);
        res.status(500).json({ error: 'Error al obtener modelos' });
    }
});

//crear nuevo modelo
router.post('/crear-modelo/:id_marcas', async (req, res) => {
    const id_marcas = req.params.id_marcas; 
    const { nombre } = req.body;
    try {
        const resultado = await ModelosController.insertarModelo(id_marcas, nombre);
        // res.status(201).json(resultado); 
        // te agregue esta linea para obtener el id del json :)
        res.status(201).json({ id_modelos: resultado.insertId });
    } catch (err) {
        console.error('Error al agregar modelo:', err.message);
        res.status(500).json({ error: 'Error al agregar modelo' });
    }
});

module.exports = router;
