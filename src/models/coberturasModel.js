const conexion = require('../models/db');

    class CoberturasModel {

        static async obtenerCobertura(id_suma, tipo_plan) {
            const sql = `
                SELECT id_cobertura, id_suma, prima, premio
                FROM coberturas 
                WHERE id_suma = ? AND tipo_plan = ?
            `;
    
            return new Promise((resolve, reject) => {
                conexion.query(sql, [id_suma, tipo_plan], (err, results) => {
                    if (err) {
                        console.error('Error al obtener coberturas', err);
                        reject(err);
                    } else {
                        console.log('Resultados de la consulta:', results);
                        resolve(results);
                    }
                });
            });
        }


        static async insertarCobertura(coberturas) {
            const { id_suma, tipo_plan, prima, premio } = coberturas; 
            const sql = `INSERT INTO coberturas(id_suma, tipo_plan, prima, premio) VALUES (?, ?, ?, ?)`;
            const [result] = await conexion.promise().query(sql, [id_suma, tipo_plan, prima, premio]); 
            return result;
        }

        static async editarCobertura({ id_suma, tipo_plan, prima, premio }) {
            console.log("Ejecutando la consulta SQL para editar cobertura con los siguientes datos:", { id_suma, tipo_plan, prima, premio });
            const sql = `
                UPDATE coberturas
                SET prima = ?, premio = ?
                WHERE id_suma = ? AND tipo_plan = ?
            `;
    
            const [result] = await conexion.promise().query(sql, [prima, premio, id_suma, tipo_plan]); 
            console.log('Resultados de la consulta editar cober:', result);
            return result;
        }
    };

module.exports = CoberturasModel;