// constantes de responsabilidad civil para autos y motos
const RC_AUTO = 18000;
const RC_MOTO = 6000;

// ----------------------------------------------------------------------------
// función para detectar tipo de vehiuculo selec y llamar a la función verificarMarca()
// ----------------------------------------------------------------------------

let tipoSeleccionado; 
let marcaGuardada = null;
let modeloGuardado = null;
let anioGuardado = null;
let sumaGuardada = null;
let coberturaGuardada = null;

const selectTipoVehiculo = document.getElementById('tipo-vehiculo');
const inputMarca = document.getElementById('marca');
const inputModelo = document.getElementById('modelo');
const inputAnio = document.getElementById('anio');
const inputSuma = document.getElementById('suma-asegurada');
// const tipoPlan = document.getElementById('tipo-plan').value;
const botonBuscarMarca = document.getElementById('buscar-marca');
const botonBuscarModelo = document.getElementById('buscar-modelo'); 
const botonBuscarAnio = document.getElementById('buscar-anio'); 
const botonInsertarSuma = document.getElementById('insertar-suma'); 
// const botonCargarCobertura = document.getElementById('crear-cobertura'); 

selectTipoVehiculo.addEventListener('change', (e) => {
    tipoSeleccionado = e.target.value; 
    console.log("tipo seleccionado", tipoSeleccionado); //anda
    
});

// --------------------------------------------------------------
// evento para el boton de buscar marca
// --------------------------------------------------------------

botonBuscarMarca.addEventListener('click', async () => {
    const nombreMarca = inputMarca.value.trim(); 
    if (!tipoSeleccionado) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, selecciona el tipo de vehículo antes de ingresar la marca.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    if (!nombreMarca) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa la marca del vehículo.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    marcaGuardada = await verificarMarca(nombreMarca, tipoSeleccionado);
    console.log(`ID de la marca en boton buscar-marca: ${marcaGuardada}`); //anda

    Swal.fire({
        icon: 'success',
        title: '¡Dato ingresado correctamente!',
        timer: 880,
        text: ' ',
        showConfirmButton: false,
    });
});

// ----------------------------------------------------------------------------
// función para buscar y/o crear marca
// ----------------------------------------------------------------------------

async function verificarMarca(nombre, tipo) {
    let id_marca;
    
    try {
        // Consultar o crear la marca --
        const respMarca = await fetch(`/obtener-marcas?tipo=${tipo}`);
        const datosMarca = await respMarca.json(); 

        console.log("resp server obtener marcas", datosMarca); //anda
        
        if (datosMarca) {
            const marcaEncontrada = datosMarca.data.find(item => item.nombre.toLowerCase() === nombre.toLowerCase());
            console.log("marca encontrada", marcaEncontrada); //anda 
            
            // Si la marca existe, se obtiene su ID
            if (marcaEncontrada) {
                id_marca = marcaEncontrada.id_marcas;
                console.log("id marca encontrada", id_marca); //anda -tira undefined si no la encuentra-
                
            } else {
                // Si la marca no existe, se crea
                const crearMarca = await fetch('/crear-marca', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({nombre: nombre, tipo: tipo })
                });
                const nuevaMarca = await crearMarca.json();
                console.log("json nueva marca", nuevaMarca); //anda
                
                id_marca = nuevaMarca.id_marcas;
                console.log("id nueva marca", id_marca); //anda
                
            }
        } else {
            throw new Error("No se obtuvieron datos de marcas.");
        }

        console.log("id marca antes del return", id_marca);
        
        return id_marca;

    } catch (error) {
        console.error("Error al verificar o crear la marca:", error);
        return null; 
    }
}

// --------------------------------------------------------------
// evento para el boton de buscar modelo
// --------------------------------------------------------------

botonBuscarModelo.addEventListener('click', async () => {
    const nombreModelo = inputModelo.value.trim(); 
    console.log('ver valorrrrr de',nombreModelo);
    if (!marcaGuardada) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, busca primero una marca antes de ingresar el modelo.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    
    if (!nombreModelo) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa el modelo del vehículo.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    modeloGuardado = await verificarModelo(nombreModelo, marcaGuardada);
    console.log(`ID del modelo en boton buscar-modelo: ${modeloGuardado}`); //anda

    Swal.fire({
        icon: 'success',
        title: '¡Dato ingresado correctamente!',
        timer: 880,
        text: ' ',
        showConfirmButton: false,
    });
});

// --------------------------------------------------------------
// Función para buscar y/o crear modelo
// --------------------------------------------------------------

async function verificarModelo(nombre, idMarca, tipo) {
    let id_modelo;
    
    try {
        const respModelo = await fetch(`/obtener-modelos/${idMarca}?tipo=${tipo}`);
        const datosModelo = await respModelo.json();

        console.log("resp server obtener modelos", datosModelo);
        
        if (Array.isArray(datosModelo) && datosModelo.length > 0) {
            console.log('Entrando al if - se encontraron modelos:', datosModelo);

            const modeloEncontrado = datosModelo.find(modelo => modelo.nombre.toLowerCase() === nombre.toLowerCase());
            console.log("Modelo encontrado:", modeloEncontrado);

            if (modeloEncontrado) {
                id_modelo = modeloEncontrado.id_modelos;
                console.log("ID del modelo encontrado:", id_modelo);
            } else {
                // No se encontró un modelo con el nombre especificado
                console.log('Entrando al else - modelo no encontrado, se procede a crear uno nuevo.');
                
                const crearModelo = await fetch(`/crear-modelo/${idMarca}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre: nombre })
                });
                
                const nuevoModelo = await crearModelo.json();
                console.log("JSON del nuevo modelo creado:", nuevoModelo);
                
                id_modelo = nuevoModelo.id_modelos;
                console.log("ID del nuevo modelo creado:", id_modelo);
            }
        } else {
            // datosModelo está vacío, lo que indica que no hay modelos
            console.log('No se encontraron modelos, se procede a crear uno nuevo.');

            const crearModelo = await fetch(`/crear-modelo/${idMarca}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: nombre })
            });
            
            const nuevoModelo = await crearModelo.json();
            console.log("JSON del nuevo modelo creado:", nuevoModelo);

            id_modelo = nuevoModelo.id_modelos;
            console.log("ID del nuevo modelo creado:", id_modelo);
        }

        console.log("ID del modelo antes del return:", id_modelo);
        
        return id_modelo;

    } catch (error) {
        console.error("Error al verificar o crear el modelo:", error);
        return null;
    }
}

// --------------------------------------------------------------
// evento para el boton de buscar año
// --------------------------------------------------------------

botonBuscarAnio.addEventListener('click', async () => {
    const anioIngresado = inputAnio.value.trim(); 
    if (!modeloGuardado) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, busca primero un modelo antes de ingresar el año.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    
    if (!anioIngresado) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa el año del vehículo.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    anioGuardado = await verificarAnio(anioIngresado, modeloGuardado);
    console.log(`ID del año en boton buscar-anio: ${anioGuardado}`); //anda

    Swal.fire({
        icon: 'success',
        title: '¡Dato ingresado correctamente!',
        timer: 880,
        text: ' ',
        showConfirmButton: false,
    });
});

// --------------------------------------------------------------
// Función para buscar y/o crear año
// --------------------------------------------------------------

async function verificarAnio(anio, idModelo) {
    let id_anio;

    console.log("anio parametro", anio);
    console.log("modelo parametro", idModelo);
    
    try {
        const respAnio = await fetch(`/obtener-anios/${idModelo}`);
        console.log("respAnio", respAnio);
        
        const datosAnio = await respAnio.json();

        console.log("resp server obtener años", datosAnio);
        
        if (datosAnio) {
            const anioEncontrado = datosAnio.find(item => item.anio === Number(anio));
            console.log("año encontrado", anioEncontrado);
            
            if (anioEncontrado) {
                id_anio = anioEncontrado.id_anio;
                console.log("id año encontrado", id_anio); // anda -queda undefined si no lo encuentra-
                
            } else {
                const crearAnio = await fetch(`/crear-anio/${idModelo}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_modelo:idModelo, anio: anio })
                });
                console.log("log obj crearanio", crearAnio);
                
                const nuevoAnio = await crearAnio.json();
                console.log("json nuevo año", nuevoAnio);
                
                id_anio = nuevoAnio.id_anio;
                console.log("id nuevo año", id_anio);
            }
        } else {
            throw new Error("No se obtuvieron datos de años.");
        }

        console.log("id año antes del return", id_anio); // anda
        
        return id_anio;

    } catch (error) {
        console.error("Error al verificar o crear el año:", error);
        return null; 
    }
}
// --------------------------------------------------------------
// Evento para el botón de insertar suma
// --------------------------------------------------------------

botonInsertarSuma.addEventListener('click', async () => {
    if (!marcaGuardada) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, busca primero una marca antes de ingresar el modelo.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    
    if (!modeloGuardado) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, busca primero un modelo antes de ingresar el año.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }
    
    if (!anioGuardado) {
        Swal.fire({
            icon: 'warning',
            title: '¡Atención!',
            text: 'Por favor, ingresa el año del vehículo.',
            confirmButtonText: 'Aceptar'
        });
        return;
    }    

    console.log("antes de obtener suma:", "id anio", anioGuardado);
    
    sumaGuardada = await obtenerSuma(marcaGuardada, modeloGuardado, anioGuardado);
    console.log(`ID del año en botón ingresar suma: ${sumaGuardada}`);
    
    Swal.fire({
        icon: 'success',
        title: '¡Dato ingresado correctamente!',
        timer: 880,
        text: ' ',
        showConfirmButton: false,
    });
});

// --------------------------------------------------------------
// Buscar una suma asegurada asociada y mostrarla si hay o llamar a insertarNuevaSuma()
// --------------------------------------------------------------
async function obtenerSuma(id_marca, id_modelos, id_anio) { 
    const sumaIngresada = inputSuma.value.trim(); 
    try {
        const respSuma = await fetch(`/obtener-suma/${id_anio}`);
        const datosSuma = await respSuma.json();
        console.log("Respuesta del servidor de obtener suma", datosSuma);
        
        if (datosSuma.data && datosSuma.data.length > 0) {
            const sumaEncontrada = datosSuma.data.find(item => item.id_anio === parseInt(id_anio));
            console.log("¿Suma encontrada?", sumaEncontrada);
            
            if (sumaEncontrada) {
                inputSuma.value = sumaEncontrada.suma; 
                console.log("Entrando al if porque encontró la suma y retornando id", "valor", inputSuma.value, "id:", sumaEncontrada.id_suma);
                return sumaEncontrada.id_suma; 
            } else {
                console.log("No existe suma para ese vehículo, cargando...");
                return await insertarNuevaSuma(id_anio, sumaIngresada); 
            }
        } else {
            console.log("No se encontró ninguna suma asegurada para este año.");
            return await insertarNuevaSuma(id_anio, sumaIngresada);
        }
    } catch (error) {
        console.error("Error al obtener la suma:", error);
        return null; 
    }
}

// --------------------------------------------------------------
// Función para insertar una nueva suma asegurada al servidor
// --------------------------------------------------------------
async function insertarNuevaSuma(id_anio, suma) {
    try {
        const sumadatos = { 
            id_anio,
            suma
        };
        const crearSuma = await fetch('/insertar-suma', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sumadatos })
        });
        const dataSuma = await crearSuma.json();
        console.log("Suma insertada exitosamente:", dataSuma);

        const idSumaAsegurada = dataSuma.data.insertId;
        console.log('ID de la suma asegurada:', idSumaAsegurada);

        return idSumaAsegurada; 
    } catch (error) {
        console.error("Error insertando la suma:", error);
        return null; 
    }
}


/*
    CALCULAR PRIMA SEGÚN EL TIPO DE PLAN SELECCIONADO Y PREMIO --
    según el tipo de plan que se selecciona en el campo 'tipo-plan', se realiza el calculo de 
    la prima en base a  el coeficiente que corresponda a cada tipo de cobertura + la resp civil 
    (obligatoria en todos los seguros). luego, para calcular el premio, se suma un determiando
    % de impuestos a la prima
*/
let prima = 0;
let premio = 0;

// Lista de tipos de planes a insertar automáticamente
const tiposDePlanes = ['basico', 'intermedio', 'premium', 'master'];

// Función para cálculo de la prima según el tipo de plan y vehículo
function calcularPrima(tipoPlan, tipoSeleccionado, suma) {
    switch (tipoPlan) {
        case 'basico':
            return tipoSeleccionado === 'auto' ? RC_AUTO : RC_MOTO;
        case 'intermedio':
            return (tipoSeleccionado === 'auto' ? RC_AUTO : RC_MOTO) + (0.02 * suma);
        case 'premium':
            return (tipoSeleccionado === 'auto' ? RC_AUTO : RC_MOTO) + (0.03 * suma);
        case 'master':
            return (tipoSeleccionado === 'auto' ? RC_AUTO : RC_MOTO) + (0.04 * suma);
        default:
            console.error("Tipo de plan no válido");
            throw new Error("Tipo de plan no válido");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const botonCargarCobertura = document.getElementById('crear-cobertura');
    
    botonCargarCobertura.addEventListener('click', async () => {
        try {
            const sumaIngresada = parseFloat(inputSuma.value.trim());
            if (isNaN(sumaIngresada) || sumaIngresada <= 0) {
                console.error("La suma asegurada debe ser un valor positivo");
                return; 
            }
    
            // Solo llamar a obtenerSuma si sumaGuardada no tiene valor
            if (!sumaGuardada) {
                sumaGuardada = await obtenerSuma(anioGuardado);
                if (!sumaGuardada) {
                    console.error("No se pudo obtener la suma.");
                    return;
                }
            }
    
            for (const tipoPlan of tiposDePlanes) {
                prima = calcularPrima(tipoPlan, tipoSeleccionado, sumaIngresada);
                const impuestos = calcularImpuestos(prima);
                premio = prima + impuestos;
                
                // Insertar cobertura para cada tipo de plan
                const coberturaGuardada = await insertarCobertura(sumaGuardada, tipoPlan, prima, premio);
                if (coberturaGuardada) {
                    console.log(`Cobertura de tipo ${tipoPlan} insertada con ID: ${coberturaGuardada}`);
                }
            }
    
            Swal.fire({
                icon: 'success',
                title: 'Coberturas generadas',
                text: 'Se han insertado automáticamente todas las coberturas disponibles.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                location.reload();
            });
        } catch (error) {
            console.error("Error al cargar la cobertura:", error);
        }
    });
});

// Función para insertar la cobertura
async function insertarCobertura(id_suma, tipo_plan, prima, premio) {
    try {
        const coberturas = {
            id_suma,
            tipo_plan,
            prima,
            premio
        };

        const resCobertura = await fetch('/insertar-cobertura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coberturas })
        });

        if (!resCobertura.ok) {
            throw new Error('Error al insertar la cobertura');
        }

        const dataCobertura = await resCobertura.json();
        return dataCobertura.data.id;
    } catch (error) {
        console.error("Error insertando la cobertura:", error);
        return null;
    }
}

// Función para calcular impuestos en base a la prima
function calcularImpuestos(prima) {
    const iva = prima * 0.21;
    const adicFinanciero = prima * 0.02;
    const iibb = prima * 0.03;
    const impuestosVarios = prima * 0.05;

    return iva + adicFinanciero + iibb + impuestosVarios;
}
