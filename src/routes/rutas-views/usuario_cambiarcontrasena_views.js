const express = require('express');
const path = require('path'); 
const router = express.Router();

router.get('/credenciales', (req, res) => {
    res.render(path.join(__dirname, '..', '..', 'views', 'usuario_cambiarcontrasena.ejs'));
});

module.exports = router;