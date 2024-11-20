const conexion = require('../models/db');

class SumaAseguradaModel {

    static obtenerPorAnio(id_anio) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT suma, id_suma 
                FROM sumaasegurada 
                WHERE id_anio = ?
            `;
            conexion.query(sql, [id_anio], (err, results) => {
                if (err) {
                    console.error('Error al obtener sumas asociadas a ese anio:', err); 
                    reject(err);
                } else {
                    resolve(results);
                    console.log('ID modelo anio que se consulta:', id_anio);
                    console.log('Resultados de la consulta:', results);
                }
            });
        });
    }

    static obtenerGeneral(id_marcas, id_modelos, id_anio) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT id_suma, id_anio, suma 
                FROM sumaasegurada 
                WHERE id_anio = ?
            `;
            conexion.query(sql, [id_marcas, id_modelos, id_anio], (err, results) => {
                if (err) {
                    console.error('Error al obtener sumas asociadas a ese anio:', err); 
                    reject(err);
                } else {
                    console.log('Resultados de la consulta:', results);
                    resolve(results[0]);
                }
            });
        });
    }

    static insertarSuma({id_anio, suma }) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO sumaasegurada (id_anio, suma) VALUES (?, ?)`;
            conexion.query(sql, [id_anio, suma], (err, result) => {
                if (err) {
                    console.error('Error al insertar la suma asegurada:', err);
                    return reject(err);
                }
                console.log('Suma asegurada insertada con éxito');
                console.log('Resultados de la consulta:', result);
                resolve(result);
            });
        });
    }

    static editarSuma(id_suma, suma) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE sumaasegurada SET suma = ? WHERE id_suma = ?`;
            conexion.query(sql, [suma, id_suma], (err, result) => {
                if (err) {
                    console.error('Error al editar la suma asegurada:', err);
                    return reject(err);
                }
                console.log('Suma asegurada actualizada con éxito');
                resolve(result);
            });
        });
    }
};

module.exports = SumaAseguradaModel;