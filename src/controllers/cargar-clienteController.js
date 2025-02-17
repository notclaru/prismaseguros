const cargarCliente = require('../models/cargar-clienteModel');

class cargarClienteController {
    static async guardarDatos(req, res) {
        try {
            console.log('Datos recibidos:', req.body);

            //pasear los datos pq llegan comocadenas , esto lo convierte en objetos (sin esto tira error reference u is not valid json )
            const datosPersonales = JSON.parse(req.body.datosPersonales);
            const datosVehiculo = JSON.parse(req.body.datosVehiculo);

            const foto = req.file ? "/" + req.file.path : null;

            //destructurar los datos que recibo, segun los metodos para el error not definido
            const {
                nombre, apellido, dni, email, celular, direccion, ciudad, provincia
            } = datosPersonales;

            const {
                tipo_vehiculo, patente, uso_vehiculo,  
                vigencia_desde, vigencia_hasta, marcas, modelos, modeloanio, suma_asegurada, cobertura, prima, premio
            } = datosVehiculo;

            const resultado = await cargarCliente.guardarDatos({
                nombre, apellido, dni, email, celular, direccion, ciudad, provincia,
                tipo_vehiculo, patente, uso_vehiculo, foto, vigencia_desde, vigencia_hasta,
                 marcas, modelos, modeloanio, suma_asegurada, cobertura, prima, premio
            });

            res.status(201).json({
                message: 'Datos guardados',
                data: resultado 
            });
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            res.status(500).json({ error: 'Error al guardar los datos' });
        }
    }
};


module.exports = cargarClienteController;
