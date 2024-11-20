const conexion = require('../models/db');


const obtenerUsuarioPorDNI = async (dni) => {
    const query = 'SELECT * FROM datosPersonales WHERE dni = ?';
    const [rows] = await conexion.execute(query, [dni]);
    return rows[0];
};

const actualizarDatosPersonales = (dni, datos) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE datosPersonales
            SET nombre = ?, apellido = ?, email = ?, celular = ?, direccion = ?, ciudad = ?, provincia = ?
            WHERE dni = ?
        `;
        
        const values = [
            datos.nombre || null,
            datos.apellido || null,
            datos.email || null,
            datos.celular || null,
            datos.direccion || null,
            datos.ciudad || null,
            datos.provincia || null,
            dni.trim()
        ];

        console.log('Ejecutando consulta con valores:', values);

        conexion.query(query, values, (error, result) => {
            if (error) {
                console.error('Error al actualizar datos personales:', error);
                return reject(error);
            }

            // Debug: mostrar el resultado de la consulta
            console.log('Resultado de la consulta:', result);

            resolve(result);
        });
    });
};


module.exports = {
    obtenerUsuarioPorDNI,
    actualizarDatosPersonales
};
