const express = require('express');
const conexion = require('../models/db'); /*ruta en la que se llama a la conexion*/
const bcrypt = require('bcrypt'); 

class UsuarioModel {
    async validarUsuario(email, clave) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM usuarios WHERE email = ?`;

            console.log('Ejecutando consulta SQL:', sql); /* para ver si se esta ejecutando la consulta... */
            console.log('Con parámetros:', [email]); /* y ver los parámetros que está recibiendo. */

            conexion.query(sql, [email], async (err, results) => {
                if (err) return reject(err);

                if (results.length === 0) {
                    resolve(null); // No se encontró el usuario
                } else {
                    const usuario = results[0];
                    const isMatch = await bcrypt.compare(clave, usuario.clave); // Comparar la clave ingresada con la encriptada

                    if (isMatch) {
                        resolve(usuario); // Si la contraseña coincide, devuelve el usuario
                    } else {
                        resolve(null); // Si no coincide, devuelve null
                    }
                }
            });
        });
    }
}

module.exports = UsuarioModel;
