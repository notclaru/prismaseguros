const CoberturasModel  = require('../models/coberturasModel'); 

class coberturasController {

    static async obtenerCoberturas(req, res) {
        try {  
            const { tipoPlan } = req.body; 
            const { id_suma } = req.params; 
            console.log("plan controller", tipoPlan);
            console.log("idSuma controller", id_suma);
            
            const resultado = await CoberturasModel.obtenerCobertura(id_suma, tipoPlan);
            res.status(200).json({ message: 'Cobertura encontrada', data: resultado });

        } catch (error) {
            console.error('Error al obtener cobertura:', error);
            res.status(500).json({ error: 'Error al obtener cobertura' });
        }
    }

    static async agregarCobertura(req, res) {
        try {
            const { coberturas } = req.body;

            const resultado = await CoberturasModel.insertarCobertura(coberturas); 

            res.status(201).json({ message: 'Cobertura agregada exitosamente', data: resultado });
        } catch (error) {
            console.error('Error al agregar cobertura:', error);
            res.status(500).json({ error: 'Error al agregar cobertura' });
        }
    }

    static async editarCobertura(req, res) {
        try {
            const { id_suma, tipo_plan, prima, premio } = req.body; 
            console.log("Datos recibidos del frontend:", { id_suma, tipo_plan, prima, premio });
            
            
            const resultado = await CoberturasModel.editarCobertura({id_suma, tipo_plan, prima, premio });
            console.log("Resultado de la consulta SQL:", resultado);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: 'Cobertura no encontrada o no se realizó ningún cambio.' });
            }

            res.status(200).json({ message: 'Cobertura editada exitosamente', data: resultado });
        } catch (error) {
            console.error('Error al editar cobertura:', error);
            res.status(500).json({ error: 'Error al editar cobertura' });
        }
    }
}

module.exports = coberturasController;
