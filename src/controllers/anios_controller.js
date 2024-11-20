// const ModelosAniosModel = require('../models/modeloanios_models');

// TE LO COMENTE  MOMENTANEAMENTE PARA VER SI ESTE ES EL
// PROBLEMA (USO EL CONTROLADOR QUE ESTA EN EL ROUTER modeloanios.js)

// class AniosController {

//     static async obtenerAnios(id_modelos) {
//         try {
//             const anios = await ModelosAniosModel.obtenerAniosPorModelo(id_modelos);
//             console.log("anios", anios);
//             return anios;
//         } catch (error) {
//             console.error('Error al obtener años:', error);
//             res.status(500).json({ error: 'Error al obtener años' });
//         }
//     }

//     static async insertarAnio(id_modelos) {
//         try {
//             //const id_modelos = req.body;
//             const resultado = await ModelosAniosModel.insertarAnios(id_modelos);
//             res.status(201).json(resultado);
//         } catch (error) {
//             console.error('Error al agregar año:', error);
//             res.status(500).json({ error: 'Error al agregar año' });
//         }
//     }
// }

// module.exports = AniosController;
