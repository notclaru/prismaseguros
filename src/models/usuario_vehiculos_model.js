const conexion = require('./db');

class Usuario {
    obtenerUsuario(id_usuarios) {
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
    }
}

module.exports = Usuario;