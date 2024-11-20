const perfil_usuario_modelo = require('../models/perfil_usuario_modelo');

class PerfilUsuarioController {
    async mostrarPerfil(req, res) {
        try {
            const dni = req.params.dni; 
            const usuario = await perfil_usuario_modelo.obtenerUsuarioPorDNI(dni); 
            console.log('haciendo console log usuario:', usuario);
            if (usuario) {
                res.render('perfil_usuario', { usuario: usuario }); 
                console.log('imprimiendo desde el controlador', usuario);
            } else {
                res.status(404).send('Usuario no encontrado');
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            res.status(500).send('Error al obtener los datos');
        }
    }

    async editarDatosPersonales(req, res) {
        const datos = {
            nombre: req.body.nombre ? req.body.nombre.trim() : null,
            apellido: req.body.apellido ? req.body.apellido.trim() : null,
            dni: req.body.dni ? req.body.dni.trim() : null,
            email: req.body.email ? req.body.email.trim() : null,
            direccion: req.body.direccion ? req.body.direccion.trim() : null,
            celular: req.body.celular ? req.body.celular.trim() : null,
            ciudad: req.body.ciudad ? req.body.ciudad.trim() : null,
            provincia: req.body.provincia ? req.body.provincia.trim() : null
        };

        console.log('Datos recibidos desde el controlador:', datos);
        
        const dni = datos.dni;
        console.log('DNI:', dni);
        
        try {
            const resultado = await perfil_usuario_modelo.actualizarDatosPersonales(dni, datos);
            console.log('Resultado de la actualización:', resultado);
            if (resultado.affectedRows === 0) {
                console.warn('No se encontraron filas para actualizar. DNI:', dni);
                return res.status(404).json({ mensaje: 'No se encontraron filas para actualizar' });
            }
    
            res.json({ mensaje: 'Datos actualizados correctamente', resultado });
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            res.status(500).json({ mensaje: 'Hubo un error al actualizar los datos', error });
        }
    }
}

module.exports = new PerfilUsuarioController();
