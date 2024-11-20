const modelUsuario = require("../models/usuario"); 
const usuarioModel = new modelUsuario();
const bcrypt = require('bcrypt'); // librería para encriptar la contraseña

/*
	CLASE USUARIOCONTROLLER --
	maneja la lógica relacionada con las operaciones de usuario en la aplicación. 
	contiene métodos para mostrar el formulario de inicio de sesión, validar las credenciales 
	de un usuario  y cambiar la contraseña.
*/

class UsuarioController { 

	/*
		MÉTODO MOSTRARFORMULARIO() -- 
		se encarga de mostrar el formulario de inicio de sesion, renderizando la
		vista llamada "panel/login" (EJS). 
	*/

	mostrarFormulario (req, res) { 
		res.render('panel/login');
	}

	/*
		MÉTODO VALIDARFORMULARIO() -- 
		se encarga de validar las credenciales de un usuario (correo electrónico y contraseña) 
		enviadas a través de un formulario. Si las credenciales son válidas, se guarda el ID del usuario 
		y el ID del proyecto asociado en la sesión, y el usuario es redirigido a un panel. 
		Si las credenciales no son válidas, se devuelve un error en formato JSON.
	*/

	async validarFormulario (req, res) { 
		const email = req.body.email; 
		const password = req.body.password;

		// llama al metodo validarUsuario para verificar si las credenciales son correctas
		const usuario = await usuarioModel.validarUsuario(email, password);
		
		if (usuario != null) { 
			req.session.idUsuario = usuario.id; 
			req.session.idProyecto = usuario.id_proyecto;
			console.log(req.session);

			res.redirect('/panel');

		} else {
			res.json({
				"error": 1,
			});
		}
	}

	/*
        MÉTODO VALIDARCREDENCIAL() --
        este método valida la contraseña actual del usuario.
        compara la contraseña proporcionada en la solicitud con la almacenada en la base de datos.
    */
   
	static validarCredencial(req, res) {
		const idUsuario = req.session.idUsuario;
		const { claveActual } = req.body;

		console.log("id usuario controller validar", idUsuario);
		console.log("clave actual controller", claveActual );
		
		
		usuarioModel.obtenerPorId(idUsuario, (error, usuario) => {
			if (error) {
				return res.status(500).json({ error: 'Error en el servidor.' });
			}
			console.log("no hubo error en la consulta del modelo");
			
	
			if (!usuario) {
				return res.status(404).json({ error: 'Usuario no encontrado.' });
			}
			console.log("el usuario fue encontrado");
			
	
			// validar la contraseña actual
			bcrypt.compare(claveActual, usuario.clave, (error, esCoincidente) => {
				if (error) {
					return res.status(500).json({ error: 'Error en el servidor.' });
				}
	
				if (!esCoincidente) {
					return res.status(401).json({ error: 'La contraseña actual es incorrecta.' });
				}

				return res.status(200).json({ message: 'Contraseña actual válida.' });
			});
		});
	}

	/*
		MÉTODO CAMBIARCREDENCIAL() -- 
		se encarga de cambiar la contraseña de un usuario obteniendo el ID del usuario desde la sesión 
		y la nueva contraseña del cuerpo de la solicitud. 
		Luego, encripta la nueva contraseña usando bcrypt y llama a un método de modelo para 
		actualizar la contraseña en la base de datos. 
		Por último, envía una respuesta al cliente (front) según el resultado de la operación.
	*/

    static async cambiarCredencial(req, res) {
		try {		
			const id_usuario = req.session.idUsuario; 
			const { clave } = req.body; 
	
			// encriptar la nueva contraseña
			const claveCifrada = await bcrypt.hash(clave, 10); 
	
			usuarioModel.cambiarCredencial(id_usuario, claveCifrada, (error, usuarioActualizado) => {
				if (error) {
					return res.status(500).json({ message: 'Error en el servidor.' });
				}
	
				if (usuarioActualizado) {
					res.json({ message: 'Contraseña cambiada exitosamente.' });
				} else {
					res.status(400).json({ message: 'No se pudo cambiar la contraseña.' });
				}
			});
		} catch (error) {
			console.error("Error al cambiar la contraseña:", error);
			res.status(500).json({ message: 'Error en el servidor.' });
		}
	}
	
}

module.exports = UsuarioController;