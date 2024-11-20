const MarcasModel = require('../models/marcas_modelo');

class MarcasController {
   //obtiene todas las marcas segun el tipo (auto, moto), para cargar cliente
    static async obtenerMarcas(req, res) {
        const tipo = req.query.tipo; 

        if (!tipo) {
            return res.status(400).json({ error: 'El tipo de vehículo es requerido' });
        }

        try {
            const marcas = await MarcasModel.obtenerTodos(tipo); 
            console.log(marcas);
            
            res.json({ data: marcas });
        } catch (error) {
            console.error('Error al obtener marcas:', error);
            res.status(500).json({ error: 'Error al obtener marcas' });
        }
    }

   //crea una nueva marca si no existe ya, para coberturas
   static async agregarMarca(req, res) {
        try {
            const marca = req.body;
            console.log('Datos recibidos:', req.body);

            const resultado = await MarcasModel.insertarMarca(marca);
            console.log('Resultado de la insercion:', resultado);
            // res.status(201).json(resultado); 
            // te agregue esta linea para q me mande el id de la marca creadaaa 
            res.status(201).json({ id_marcas: resultado.insertId });
        } catch (error) { 
            console.error('Error al agregar marca:', error);
            res.status(500).json({ error: 'Error al agregar marca' });
        }
    }

}

module.exports = MarcasController;
