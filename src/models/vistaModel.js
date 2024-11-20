const conexion = require('./db');

class vistaClientes {
    
    static async mostrarLista() {

        const sql = `
            SELECT dp.id_cliente, dp.nombre, dp.email, dp.celular
            FROM datosPersonales dp
            WHERE dp.archivado = FALSE`;
            
            //JOIN datosVehiculo dv ON dp.id_cliente = dv.id_cliente

        return new Promise((resolve, reject) => {
            conexion.query(sql, (error, results) => {
                if (error) {
                    console.error("Error en la consulta de solicitudes:", error);
                    return resolve([]); // devuelve un array vacío en caso de error
                }
                resolve(results || []);
            });
        })
    }

    static async obtenerClienteID(id) {
        const sql = `SELECT *
                    FROM datosPersonales WHERE id_cliente = ?`;
        
        //promesa para poder usar `await` en el controlador
        return new Promise((resolve, reject) => {
            conexion.query(sql, [id], (error, results) => {
                if (error) {
                    console.error("Error en la consulta de solicitudes:", error);
                    return resolve(null); // devuelve un array vacío en caso de error
                }
                resolve(results[0]);
            });
        });
    }

    // archivar un cliente
    static async archivarCliente(id) {
        const sql = `UPDATE datosPersonales SET archivado = TRUE WHERE id_cliente = ?`;

        return new Promise((resolve, reject) => {
            conexion.query(sql, [id], (error, results) => {
                if (error) {
                    console.error("Error al archivar el cliente:", error);
                    return resolve(false); 
                }
                resolve(true); 
            });
        });
    }

    // desarchivar un cliente
    static async desarchivarCliente(id) {
        const sql = `UPDATE datosPersonales SET archivado = FALSE WHERE id_cliente = ?`;
        console.log("SQL DESARCHIVAR", sql); // anda
        

        return new Promise((resolve, reject) => {
            conexion.query(sql, [id], (error, results) => {
                if (error) {
                    console.error("Error al desarchivar el cliente:", error);
                    return resolve(false); 
                    
                }
                resolve(true); 
            });
        });
    }

    // mostrar clientes archivados
    static async mostrarClientesArchivados() {
        const sql = `
            SELECT dp.id_cliente, dp.nombre, dp.email, dp.celular
            FROM datosPersonales dp
            WHERE dp.archivado = TRUE`;
            
        //JOIN datosVehiculo dv ON dp.id_cliente = dv.id_cliente
        return new Promise((resolve, reject) => {
            conexion.query(sql, (error, results) => {
                if (error) {
                    console.error("Error en la consulta de clientes archivados:", error);
                    return resolve([]); 
                }
                resolve(results || []); 
            });
        });
    }
};

module.exports = vistaClientes;