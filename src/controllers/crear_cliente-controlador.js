const bcrypt = require('bcrypt');
const crearUsuario = require('../models/crear_cliente-modelo');

const crearUsuarioController = async (req, res) => {
    console.log('req.body:', req.body);
    const { nombre, apellido, dni, email, clave, rol_id } = req.body;

    try {
        // cifrar la clave
        const claveCifrada = await bcrypt.hash(clave, 10); 

        await crearUsuario({ nombre, apellido, dni, email, clave: claveCifrada, rol_id });
        
        console.log('Controlador: usuario creado exitosamente');
        res.json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);

        if (error.message.includes('Este usuario ya ha sido creado')) {
            return res.status(400).json({ error: 'Este usuario ya ha sido creado.' });
        }

        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = crearUsuarioController;
