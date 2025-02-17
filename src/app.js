// configurar el servidor web con express
const express = require('express');
const app = express();
const path = require('path');
const port = 3005;
const bodyParser = require("body-parser");
const conexion = require('./models/db'); //importo la conexion de la db
const mysql = require('mysql2');
const morgan = require('morgan');
app.use(morgan('dev'));

// middleware 
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());

app.use('/public', express.static('public'));

// configuracion para usar ejs (motor de plantillas) para hacer html dinamico, necesitan instalar: npm install ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const session = require('express-session');

//se configura la sesion
app.use(session({
    secret: 'mi_secreto_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, //cambia a true si se usa https
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// rutas de vistas (FRONTEND) -----------------------------
const rutaCargaCliente = require('./routes/rutas-views/cargar_usuario_views');
const rutaInicio = require('./routes/rutas-views/inicio_views');
const rutaLogin = require('./routes/rutas-views/login_views');
const rutaRecover = require('./routes/rutas-views/recover_views');
const rutaForm = require('./routes/rutas-views/solicitante_form_views'); 
const rutaPoliza = require('./routes/rutas-views/poliza_views');
const rutaVehiculo = require('./routes/rutas-views/ver_vehiculos_views');
const rutaCrearUsuario = require('./routes/rutas-views/crear_usuario_views');
const rutaCoberturas = require ('./routes/rutas-views/cobeturas-views')
const rutaUsuarioPanel = require('./routes/rutas-views/usuario_panel_views');
const rutaUsuarioDatosPers = require('./routes/rutas-views/usuario_datospersonales_views');
const rutaUsuarioVehiculos = require('./routes/rutas-views/usuario_vehiculos_views');
const rutaUsuarioDenunciarSin = require('./routes/rutas-views/usuario_denunciarsiniestro_views');
const rutaUsuarioCambiarContr =  require('./routes/rutas-views/usuario_cambiarcontrasena_views');

app.use('/', rutaCargaCliente);
app.use('/', rutaInicio);
app.use('/', rutaLogin);
app.use('/', rutaRecover);
app.use('/', rutaForm);
app.use('/', rutaPoliza);
app.use('/', rutaVehiculo);
app.use('/', rutaCrearUsuario);
app.use('/', rutaCoberturas);
app.use('/', rutaUsuarioPanel);
app.use('/usuario', rutaUsuarioDatosPers);
app.use('/usuario', rutaUsuarioVehiculos);
app.use('/usuario', rutaUsuarioDenunciarSin);
app.use('/usuario', rutaUsuarioCambiarContr);

// rutas API (BACKEND) ------------------------------------
const rutaDatos = require('./routes/guardar-datos');
const rutaPanel = require('./routes/panel');
const authRoutes = require('./routes/ruta_de_autenticacion');
const marcasRoutes = require('./routes/marcas'); 
const modelosRoutes = require('./routes/modelos');
const modelosAniosRoutes =  require('./routes/modeloanios');
const sumaAseguradaRoutes =  require('./routes/sumaAsegurada');
const coberturaRoutes =  require('./routes/coberturas');
const cargarCliente = require('./routes/cargar-cliente');
const rutaSolicitudes = require('./routes/solicitudes_ruta');
const rutaVista = require('./routes/vista_ruta');
const rutaBuscarEmail = require('./routes/buscar_email-ruta');
const rutaCrearUsuarioEmail = require('./routes/crear_cliente-ruta');
const rutaPerfilUsuario = require('./routes/perfil_usuario_ruta');
const datosPersonales = require('./routes/datospersonales');
const datosVehiculos = require('./routes/vehiculos_asegurados');
const usuarioInicio = require('./routes/usuario_inicio');
const rutaVerVehiculo = require('./routes/ver_vehiculos_ruta');
const rutaCambioCredenciales = require('./routes/cambiar-credenciales');

app.use('/', authRoutes);
app.use('/', rutaDatos);
app.use('/', rutaPanel);
app.use('/', marcasRoutes);  
app.use('/', modelosRoutes);  
app.use('/', modelosAniosRoutes);  
app.use('/', sumaAseguradaRoutes);
app.use('/', coberturaRoutes);
app.use('/', cargarCliente);
app.use('/', rutaSolicitudes);
app.use('/', rutaVista);
app.use('/api', rutaCrearUsuarioEmail);
app.use('/api', rutaBuscarEmail);
app.use('/', rutaPerfilUsuario);
app.use('/', datosPersonales);
app.use('/', datosVehiculos);
app.use('/', usuarioInicio);
app.use('/', rutaVerVehiculo);
app.use('/', rutaCambioCredenciales);

// levantar el servidor 
app.listen(port, () => {
    console.log(`El servidor corre en el puerto ${port}`);
})
