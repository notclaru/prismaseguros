const ModelosModel = require('../models/modelos_models');

class ModelosController {
    //obtener modelos
    static async obtenerPorMarcaYTipo(id_marca, tipo) {
        try {
            const modelos = await ModelosModel.obtenerPorMarcaYTipo(id_marca, tipo);
            return modelos; 
        } catch (error) {
            console.error('Error al obtener modelos:', error);
            throw new Error('Error al obtener modelos');
        }
    }
    //insertar modelo a la db
    static async insertarModelo(id_marcas, nombre) {
        try {
            const resultado = await ModelosModel.insertarModelo( {id_marcas, nombre});
            return resultado; 
        } catch (error) {
            console.error('Error al insertar modelo:', error);
            throw new Error('Error al insertar modelo');
        }
    }
}

module.exports = ModelosController;
