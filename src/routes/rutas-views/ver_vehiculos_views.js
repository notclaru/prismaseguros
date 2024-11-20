const express = require('express');
const path = require('path'); 
const router = express.Router();

/*router.get('/ver_vehiculo', (req, res) => {
    res.render(path.join(__dirname, '..', '..', 'views', 'vehiculos.ejs'));
});*/
router.get('/ver-perfil/:usuarioId', (req, res) => {
    const usuarioId = req.params.usuarioId;

    const query = 'SELECT imagen FROM usuarios WHERE id = ?';
    db.query(query, [usuarioId], (err, result) => {
        if (err) {
            console.error('Error al obtener la imagen:', err);
            return res.status(500).send('Error al obtener la imagen');
        }

        if (result.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Obtener la ruta de la imagen
        const imagenPath = result[0].imagen;

        // Pasamos la ruta de la imagen a la vista
        res.render('perfil', { imagenPath });
    });
});

module.exports = router;