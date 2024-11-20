const db = require('../models/db'); 

/*
    CLASE USUARIO --
    contiene un método denominado 'cambiarCredencial' que actualiza la contraseña de un usuario en 
    la base de datos y un método 'obtenerPorId' para buscar los datos del usuario
*/

class Usuario {
    // este método recibe tres parametros: 
    //      1) id del usuario que va a cambiar la contraseña, 
    //      2) la clave cifrada,
    //      3) callback, función para manejar las respuestas del servidor 
    cambiarCredencial(idUsuario, claveCifrada, callback) {
        db.query(
            'UPDATE usuarios SET clave = ? WHERE id_usuarios = ?',
            [claveCifrada, idUsuario],
            // función callback que se ejecuta cuando la consulta SQL se completa
            (error, result) => {
                if (error) {
                    console.error("Error al cambiar la contraseña en el modelo:", error);
                    return callback(error, null); 
                }
                
                // llama a la función callback pasandole como 1er argumento null (no hubo errores)
                // y como 2do argumento el resultado de la comparación, devuelve true si al menos 
                // 1 fila fue actualizada
                callback(null, result.affectedRows > 0); 
            }
        );
    }

        obtenerPorId(id, callback) {
            console.log("entrando a modelo obtenerporid");
            
            const query = 'SELECT * FROM usuarios WHERE id_usuarios = ?';
            db.execute(query, [id], (error, results) => {
                if (error) {
                    console.error('Error al obtener usuario por ID:', error);
                    return callback(new Error('Error al obtener usuario'), null);
                }
    
                const usuario = results[0]; 
                console.log("usuario obtenido modelo", usuario);
                
                callback(null, usuario); 
            });
        }
    
}

module.exports = Usuario;
