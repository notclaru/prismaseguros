const SumaAseguradaModel  = require('../models/sumaAseguradaModel'); 

class SumaController {
    
    static async obtenerSumaCliente(req, res) {
        try {
            const { id_anio } = req.params;
            console.log("ID modelo año recibido cliente:", id_anio); // Verifica que se recibe correctamente
    
            const resultado = await SumaAseguradaModel.obtenerPorAnio(id_anio);
    
            console.log("Resultado consulta suma asegurada cliente", resultado);
    
            res.status(200).json(resultado);
            return;
        } catch (error) {
            console.error('Error al obtener suma asegurada:', error);
            res.status(500).json({ error: 'Error al obtener suma' });
        }
    }

    static async obtenerSuma(req, res) {
        try {
            const { id_anio } = req.params;
            console.log("ID modelo año recibido:", id_anio); // Verifica que se recibe correctamente
    
            const resultado = await SumaAseguradaModel.obtenerPorAnio(id_anio);
    
            // Verificar si el resultado tiene la propiedad suma
            // if (resultado && resultado.suma !== undefined) {
                res.status(200).json({ suma: resultado.suma });
            // } else {
            //     res.status(404).json({ error: 'Suma no encontrada para el año dado' });
            // }
    
            console.log("Resultado consulta suma asegurada", resultado);
        } catch (error) {
            console.error('Error al obtener suma asegurada:', error);
            res.status(500).json({ error: 'Error al obtener suma' });
        }
    }
    
    static async agregarSuma(req, res) {
        try {  
            const { sumadatos } = req.body;
            const resultado = await SumaAseguradaModel.insertarSuma(sumadatos); 

            res.status(201).json({ message: 'Suma asegurada agregada exitosamente', data: resultado });
        } catch (error) {
            console.error('Error al agregar suma asegurada:', error);
            res.status(500).json({ error: 'Error al agregar suma' });
        }
    }

    static async editarSuma(req, res) {
        try {
            const { id_suma } = req.params; // Obtenemos el id de la suma
            const { suma } = req.body; // Obtenemos el nuevo valor de la suma

            // Validación de los datos
            if (isNaN(suma) || suma <= 0) {
                return res.status(400).json({ error: 'La suma asegurada debe ser un valor positivo' });
            }

            // Llamamos al modelo para actualizar la suma asegurada
            const resultado = await SumaAseguradaModel.editarSuma(id_suma, suma);

            if (resultado.affectedRows > 0) {
                return res.status(200).json({ message: 'Suma asegurada actualizada correctamente', data: resultado });
            } else {
                return res.status(404).json({ error: 'Suma asegurada no encontrada' });
            }

        } catch (error) {
            console.error('Error al editar suma asegurada:', error);
            res.status(500).json({ error: 'Error al editar suma' });
        }
    }
}

module.exports = SumaController;
