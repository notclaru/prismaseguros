const conexion = require('../models/db');

class ModelosModel {
    static obtenerPorMarcaYTipo(id_marcas, tipo) {
        return new Promise((resolve, reject) => {
            const sql = `
               SELECT modelos.id_modelos, modelos.nombre
                FROM modelos
                INNER JOIN marcas ON modelos.id_marcas = marcas.id_marcas
                WHERE modelos.id_marcas = ? AND marcas.tipo = ?
            ` ;

            conexion.query(sql, [id_marcas, tipo], (err, results) => {
                if (err) {
                    console.error('Error al obtener modelos:', err); 
                    reject(err);
                } else {
                    resolve(results);
                    console.log('Resultados de la consulta:', results);
                }
            });
        });
    }

    static insertarModelo(modelo) {
        return new Promise((resolve, reject) => {
            const { id_marcas, nombre } = modelo;
            console.log('Datos a insertar:', { id_marcas, nombre }); 
            const sql = `INSERT INTO modelos (id_marcas, nombre) VALUES (?, ?)`;
            conexion.query(sql, [id_marcas, nombre], (err, result) => {
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

module.exports = ModelosModel;
