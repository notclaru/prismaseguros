const VistaClientes = require('../models/vistaModel');

class vistaControlador {
    
    async mostrarLista(req, res) {
        try {
            console.log('Ejecutando la consulta a la base de datos');
            const usuarios = await VistaClientes.mostrarLista() || [];
            console.log('Datos que voy a enviar a vista clientes:', usuarios);
            res.render('vistaClientes', { usuario: usuarios });
        } catch (error) {
            console.log("Error al obtener datos:", error);
            res.status(500).send("Error al obtener los datos");
        }
    }

    async obtenerClienteID(req, res) {
        try {
            console.log('Ejecutando la consulta a la base de datos desde vistaController');
            const id = req.params.id; 
            console.log('ID:', id);
            
            const usuarioUnico = await VistaClientes.obtenerClienteID(id); 
            
            if (!usuarioUnico) {
                res.redirect("/vistaClientes");
                return;
            }

            res.render('perfil', { usuario: usuarioUnico });
        } catch (error) {
            console.log("Error al obtener datos:", error);
            res.status(500).send("Error al obtener los datos");
        }
    }

    // archivar cliente
    async archivarCliente(req, res) {
        const { id } = req.params;
    
        try {
            const success = await VistaClientes.archivarCliente(id);
    
            if (success) {
                res.json({ success: true });
            } else {
                res.status(500).json({ success: false });
            }
        } catch (error) {
            console.error('Error al archivar el cliente:', error);
            res.status(500).json({ success: false });
        }
    }

    // desarchivar cliente
    async desarchivarCliente(req, res) {
        try {
            const id = req.params.id;
            console.log("id desarchivar cliente", id); // anda
            
            const success = await VistaClientes.desarchivarCliente(id);
    
            if (success) {
                res.status(200).send({ message: "Cliente desarchivado correctamente", id }); // anda
            } else {
                res.status(500).send("Error al desarchivar el cliente");
            }
        } catch (error) {
            console.log("Error al desarchivar el cliente:", error);
            res.status(500).send("Error al desarchivar el cliente");
        }
    }

    // mostrar clientes archivados
    async mostrarClientesArchivados(req, res) {
        console.log('Ejecutando mostrarClientesArchivados'); 
        try {
            console.log('Ejecutando la consulta de clientes archivados');
            const datosArchivados = await VistaClientes.mostrarClientesArchivados() || [];
            console.log('Clientes archivados obtenidos:', datosArchivados);
            res.render('vistaClientes/vistaArchivados', { clientesArchivados: datosArchivados });
        } catch (error) {
            console.log("Error al obtener clientes archivados:", error);
            res.status(500).send("Error al obtener clientes archivados");
        }
    }
}

module.exports = vistaControlador;