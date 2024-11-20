const conexion = require('../models/db');

class MarcasModel {
    static obtenerTodos(tipo) {
        return new Promise((resolve, reject) => {
            
            const sql = `SELECT id_marcas, nombre FROM marcas WHERE tipo = ?`;
            conexion.query(sql, [tipo], (err, results) => {
                if (err) {
                    console.error('Error en la consulta SQL:', err);
                    return reject(err);
                }

                if (results.length === 0) {
                    return resolve([]);
                }

                resolve(results);
            });
        });
    }
    static insertarMarca(marca) {
        return new Promise((resolve, reject) => {
            const { nombre, tipo } = marca; 
            console.log('Datos a insertar:', { nombre, tipo }); 
            const sql = `INSERT INTO marcas (nombre, tipo) VALUES (?, ?)`;
            conexion.query(sql, [nombre, tipo], (err, result) => {
                if (err) {
                    console.log('Error en la consulta', err);
                    return reject(err);
                }
                console.log('Insertado con exito');
                resolve(result);
            });
        });
    }
}

module.exports = MarcasModel;
