const conexion = require('../models/db');

class ModelosAniosModel {
    static obtenerAniosPorModelo(id_modelos) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT anio, id_modelo_anio
                FROM modelos_anios
                WHERE id_modelos = ?
            `;
            conexion.query(sql, [id_modelos], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Anios disponibles para el modelo: ', results);
                    resolve(results);
                }
            });
        });
    }
    // agregue q reciba por parametro el id modelo para insertarlo sino se guardaba null en la bd
    static insertarAnios(id_modelos, anios) {
        return new Promise((resolve, reject) => {
            const anio = anios;
            const id_modelo = id_modelos;
            console.log("modelo", id_modelo); // anda
            console.log("anio", anios); //anda
            
            const sql = `INSERT INTO modelos_anios (id_modelos, anio) VALUES (?, ?)`;
            conexion.query(sql, [id_modelo, anio], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = ModelosAniosModel;