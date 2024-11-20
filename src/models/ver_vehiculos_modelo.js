const conexion = require('../models/db');

const VehiculoModel = {
    getClienteById: async (id_cliente) => {
        try {
            console.log('ID Cliente en getClienteById:', id_cliente); 
            const query = `SELECT * FROM datospersonales WHERE id_cliente = ?`;
            const [results] = await conexion.promise().query(query, [id_cliente]);
            console.log('Respuesta de la consulta en el modelo: ',results);

            return results[0];
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw error;
        }
    },

    obtenerVehiculosXCliente: async (id_usuarios) => {
        return new Promise((resolve, reject) => {
        const sql = `
                SELECT 
                    u.id_usuarios,
                    dp.nombre,
                    dp.apellido,
                    dp.dni,
                    dv.tipo_vehiculo,
                    dv.patente,
                    dv.uso_vehiculo,
                    dv.vigencia_desde,
                    dv.vigencia_hasta,
                    dv.marcas,           
                    dv.modelos,         
                    dv.modeloanio,          
                    dv.suma_asegurada,
                    dv.cobertura,     
                    dv.prima,   
                    dv.premio      
                FROM usuarios u
                JOIN datosPersonales dp ON u.dni = dp.dni
                JOIN datosVehiculo dv ON dp.id_cliente = dv.id_cliente
                WHERE u.id_usuarios = ?
            `;

            conexion.query(sql, [id_usuarios], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve([]);
                }

                resolve(results);
            });
        });
    
    },

    // actualizarVehiculo: async ({ id_vehiculo, patente, tipo_vehiculo, uso_vehiculo, anio, vigencia_desde, vigencia_hasta, id_marcas, id_modelos, suma_asegurada, premio_total }) => {
    //     try {
    //         const query = `
    //             UPDATE datosVehiculo 
    //             SET 
    //                 patente = ?, 
    //                 tipo_vehiculo = ?, 
    //                 uso_vehiculo = ?, 
    //                 anio = ?, 
    //                 vigencia_desde = ?, 
    //                 vigencia_hasta = ?, 
    //                 id_marcas = ?, 
    //                 id_modelos = ?, 
    //                 suma_asegurada = ?, 
    //                 premio_total = ?
    //             WHERE id_vehiculo = ?`;
            
    //         await conexion.promise().query(query, [patente, tipo_vehiculo, uso_vehiculo, anio, vigencia_desde, vigencia_hasta, id_marcas, id_modelos, suma_asegurada, premio_total, id_vehiculo]);
    //     } catch (error) {
    //         console.error('Error al actualizar el vehículo:', error);
    //         throw error;
    //     }
    // }
};

module.exports = VehiculoModel;
