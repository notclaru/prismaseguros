// ----------------------------------------------------------------------------
// Buscar coberturas existentes para editar -----------------------------------
// ----------------------------------------------------------------------------

const tipoSelect = document.getElementById('tipo-vehiculo');
const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');
const anioSelect = document.getElementById('anio');
let idSuma = 0;

// cargar marcas según el tipo seleccionado --
tipoSelect.addEventListener('change', async () => {
    const tipo = tipoSelect.value;

    const solicitudServidor = await fetch(`/obtener-marcas?tipo=${tipo}`);
    const respServidor = await solicitudServidor.json();
    
    // console.log('Respuesta del servidor:', respServidor);

    if (respServidor.error) {
        console.error(respServidor.error);
        return;
    }

    marcaSelect.innerHTML = '<option value="" disabled selected>Selecciona la marca</option>';
    respServidor.data.forEach(marca => {
        marcaSelect.innerHTML += `<option value="${marca.id_marcas}">${marca.nombre}</option>`;
    });

    modeloSelect.innerHTML = '<option value="" disabled selected>Selecciona el modelo</option>';
    anioSelect.innerHTML = '<option value="" disabled selected>Selecciona el año</option>';
});

// cargar modelos según el año seleccionado --
marcaSelect.addEventListener('change', async () => {
    const id_marca = marcaSelect.value;
    const tipo = tipoSelect.value;
    // console.log("Iniciando solicitud fetch con id_marcas:", id_marca, "y tipo:", tipo);

    try {
        const solicitudServidor = await fetch(`/obtener-modelos/${id_marca}?tipo=${tipo}`);
        const respServidor = await solicitudServidor.json();
        // console.log("Respuesta completa del servidor:", respServidor);

        if (Array.isArray(respServidor)) {
            modeloSelect.innerHTML = '<option value="" disabled selected>Selecciona el modelo</option>';
            respServidor.forEach(modelo => {
                modeloSelect.innerHTML += `<option value="${modelo.id_modelos}">${modelo.nombre}</option>`;
            });

            anioSelect.innerHTML = '<option value="" disabled selected>Selecciona el año</option>';
        } else {
            console.error("La respuesta no contiene un array válido.");
        }
    } catch (error) {
        console.error("Error al cargar modelos:", error);
    }
});

// cargar años según el modelo seleccionado --
modeloSelect.addEventListener('change', async () => {
    const id_modelos = modeloSelect.value;
    // console.log('Modelo seleccionado:', id_modelos); 

    try {
        const solicitudServidor = await fetch(`/obtener-anios/${id_modelos}`);
        const respServidor = await solicitudServidor.json();
        // console.log("Respuesta completa del servidor para los años:", respServidor);

        if (Array.isArray(respServidor)) {
            anioSelect.innerHTML = '<option value="" disabled selected>Selecciona el año</option>';
            respServidor.forEach(anioArray => {
                anioSelect.innerHTML += `<option value="${anioArray.id_modelo_anio}">${anioArray.anio}</option>`;
            });
        }
         else {
            console.error("La respuesta no contiene un array válido.");
        }
    } catch (error) {
        console.error("Error al cargar años:", error);
    }
});

// cambiar suma asegurada según el año seleccionado --
const anio = document.getElementById('anio');
anio.addEventListener('change', async function() {
    const id_anio = anio.value;
    // console.log(anio.innerHTML);
    
    // console.log("Valor de id_anio:", id_anio);
    if (!id_anio) {
        console.error("No se ha seleccionado un año");
        return;
    }


    // console.log("ID de modelo_anio seleccionado:", id_anio)
    await obtenerSuma(id_anio);

    async function obtenerSuma(id_anio) { 
        try {
            // console.log("ejecutando obtenerSuma()", id_anio);
            
            const respSuma = await fetch(`/obtener-suma/${id_anio}`);
            console.log("RESP_SUMA", respSuma);
            
            const datosSuma = await respSuma.json();
            console.log("resp del servidor de obtener suma", datosSuma); //anda
            
            if (datosSuma && Object.keys(datosSuma).length > 0) {
                //const sumaEncontrada = datosSuma.find(item => item.id_anio === parseInt(id_anio));
                const sumaEncontrada = datosSuma[0].suma;
                console.log("suma encontrada?", sumaEncontrada); //anda
                
                if (sumaEncontrada) {
                    const inputSuma = document.getElementById('suma-asegurada');
                    inputSuma.value = sumaEncontrada; 
                    const id_suma = datosSuma[0].id_suma;
                    idSuma = datosSuma[0].id_suma;
                    console.log("Entrando al if porque encontró la suma y retornando id", "valor", inputSuma.value, "id:", id_suma); // anda
                    verificarSuma();
                    //return; 
                } else {
                    mostrarAlerta();
                    //return;
                }
            }
        } catch (error) {
            mostrarAlerta();
            // console.log("llego al catch.");
            //return;
        }
    }
}); 
          

// obtener prima y premio según la suma que se cargó -- 
document.getElementById('tipo-plan').addEventListener('change', async function() {
    const tipoPlan = this.value;
    // console.log("id suma asegurada", idSuma); //anda
    
    if (idSuma && tipoPlan) {
        try {
            const respCobertura = await fetch(`/obtener-cobertura/${idSuma}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipoPlan })
            });

            const datosCobertura = await respCobertura.json();
            // console.log("Cobertura obtenida:", datosCobertura);

            if (datosCobertura.data && datosCobertura.data.length > 0) {
                const primaInput = document.getElementById('prima');
                const premioInput = document.getElementById('premio');
                
                // Mostrar los valores de prima y premio
                primaInput.value = datosCobertura.data[0].prima;
                premioInput.value = datosCobertura.data[0].premio;

                verificarSuma();
            } else {
                mostrarAlerta();
            }
        } catch (error) {
            mostrarAlerta();
            console.error("Error al obtener cobertura:", error);
        }
    }
});

// función para mostrar en caso de que la cobertura no exista
function mostrarAlerta() {
    Swal.fire({
        title: 'No existe cobertura',
        text: 'No existe actualmente una cobertura para este vehículo. ¿Desea agregarla?',
        icon: 'warning',
        iconColor: '#2197a3', 
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Salir',
        buttonsStyling: false, 
        customClass: {
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-salir',
        },
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'http://localhost:3026/cargar_coberturas';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = 'http://localhost:3026/coberturas';
        }
    });
}

// ----------------------------------------------------------------------------
// Modo edición y gestión de cambios ------------------------------------------
// ----------------------------------------------------------------------------

// función que verifica si el input de suma tiene valor y activa el botón editar --
function verificarSuma(){
    const botonEditarSuma = document.getElementById('editar-suma');
    // console.log("valor de la suma", inputSuma.value);
    
    if (idSuma >= 1) { 
        botonEditarSuma.classList.remove('desactivado');
        botonEditarSuma.classList.add('activo');
    }
}

// función que decide qué hacer según el botón clickeado --
function accionBoton(accion) {
    if (accion === 'editar') {
        editarSumaAseguradaModo();
    } else if (accion === 'cancelar') {
        cancelarEdicionSuma();
    }
}

// función para editar la suma asegurada --
function editarSumaAseguradaModo() {
    const botonEditarSuma = document.getElementById('editar-suma');
    const botonGuardarCambios = document.getElementById('guardar-cambios');
    const botonCancelar = document.getElementById('cancelar');
    // console.log('editModoSuma', editModoSuma);
    
    // activar el modo edición
    // editModoSuma = true;

    // ocultar botones de editar y mostrar guardar y cancelar
    botonEditarSuma.classList.remove('activo');
    botonEditarSuma.classList.add('oculto');
    botonGuardarCambios.classList.remove('oculto');
    botonGuardarCambios.classList.add('desactivado');
    botonCancelar.classList.remove('oculto');
    botonCancelar.classList.add('activo');

    // habilitar el input para editar la suma asegurada
    const inputSuma = document.getElementById('suma-asegurada');
    const sumaAseguradaOriginal = inputSuma.value; 
    inputSuma.disabled = false; 
    inputSuma.classList.add('editable'); 

    // verificar si el valor ha cambiado y activar el botón de guardar
    inputSuma.addEventListener('input', function() {
        if (parseFloat(inputSuma.value) !== sumaAseguradaOriginal) {
            botonGuardarCambios.classList.remove('desactivado');
            botonGuardarCambios.classList.add('activo');
        } else {
            botonGuardarCambios.classList.remove('activo');
            botonGuardarCambios.classList.add('desactivado');
        }
    });
}

// función para cancelar la edición de la suma asegurada --
function cancelarEdicionSuma() {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Se perderán los cambios no guardados.",
        icon: 'warning',
        confirmButtonColor: '#2197a3',
        confirmButtonText: 'Confirmar',
        showCloseButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            // const inputSuma = document.getElementById('suma-asegurada');
            // inputSuma.value = sumaAseguradaOriginal;

            inputSuma.disabled = true;
            inputSuma.classList.remove('editable');

            document.getElementById('guardar-cambios').classList.remove('activo');
            document.getElementById('guardar-cambios').classList.add('oculto');
            document.getElementById('cancelar').classList.remove('activo');
            document.getElementById('cancelar').classList.add('oculto');

            document.getElementById('editar-suma').classList.remove('oculto');
            document.getElementById('editar-suma').classList.add('activo');

            // editModoSuma = false;
        }
    });
}

// fetch para editar suma existente --
async function editarSumaAsegurada(id_suma, suma) {
    try {
        const sumadatos = { 
            suma
        };

        // console.log('editarSuma ID', id_suma);
        
        const respuesta = await fetch(`/editar-suma/${id_suma}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sumadatos)
        });

        const dataSuma = await respuesta.json();

        if (respuesta.ok) {
            // console.log("Suma asegurada actualizada exitosamente:", dataSuma);
            return dataSuma.data;
        } else {
            console.error("Error actualizando la suma asegurada:", dataSuma.error);
            return null;
        }
        
    } catch (error) {
        console.error("Error al editar la suma asegurada:", error);
        return null;
    }
}

// función para editar coberturas existentes --
async function editarCobertura(tipo_plan, prima, premio) {
    const cobertura = {
        id_suma: idSuma,
        tipo_plan: tipo_plan,
        prima: prima,
        premio: premio,
    };

    // console.log("objeto", cobertura);
    // console.log("id q envio", cobertura.id_suma);
    
    try {
        const response = await fetch(`/editar-cobertura`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cobertura),
        });

        // console.log('Respuesta del servidor:', response);
        
        const result = await response.json();

        if (response.ok) {
            alert(result.message); 
        } else {
            alert(result.error);
        }
    } catch (error) {
        console.error('Error al editar cobertura:', error);
        alert('Error al editar cobertura');
    }
}

// función para guardar los cambios realizados en la suma asegurada --
async function guardarCambios() {
    const inputSuma = document.getElementById('suma-asegurada');
    const nuevaSuma = parseFloat(inputSuma.value.trim());
    // console.log("suma nueva", nuevaSuma);
    
    if (isNaN(nuevaSuma) || nuevaSuma <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'La suma asegurada debe ser un valor válido y positivo.',
            icon: 'error',
            confirmButtonColor: '#2197a3',
        });
        return;
    }

    // insertar la nueva suma asegurada y obtener su id
    const id_suma = await editarSumaAsegurada(idSuma, nuevaSuma);
    if (!id_suma) {
        console.error('Error al insertar la suma asegurada');
        return;
    }
    
    // calcular la prima y el premio con la nueva suma asegurada en todos los planes
    const tipoPlanBasico = "basico";
    const tipoPlanIntermedio = "intermedio";
    const tipoPlanPremium = "premium";
    const tipoPlanMaster = "master";

    const primaBasico = calcularPrima(tipoPlanBasico, tipoSelect, nuevaSuma);
    const primaIntermedio = calcularPrima(tipoPlanIntermedio, tipoSelect, nuevaSuma);
    const primaPremium = calcularPrima(tipoPlanPremium, tipoSelect, nuevaSuma);
    const primaMaster = calcularPrima(tipoPlanMaster, tipoSelect, nuevaSuma);

    const impuestoBasico = calcularImpuestos(primaBasico);
    const impuestosIntermedio = calcularImpuestos(primaIntermedio);
    const impuestosPremium = calcularImpuestos(primaPremium);
    const impuestosMaster = calcularImpuestos(primaMaster);

    const premioBasico = primaBasico + impuestoBasico;
    const premioIntermedio = primaIntermedio + impuestosIntermedio;
    const premioPremium = primaPremium + impuestosPremium;
    const premioMaster = primaMaster + impuestosMaster;

    // llamar a la función para insertar las coberturas con el id de la nueva suma asegurada
    await editarCobertura(tipoPlanBasico, primaBasico, premioBasico); 
    await editarCobertura(tipoPlanIntermedio, primaIntermedio, premioIntermedio); 
    await editarCobertura(tipoPlanPremium, primaPremium, premioPremium); 
    await editarCobertura(tipoPlanMaster, primaMaster, premioMaster); 

    // confirmar que los cambios se guardaron correctamente
    Swal.fire({
        title: '¡Éxito!',
        text: 'La suma asegurada ha sido actualizada correctamente.',
        icon: 'success',
        confirmButtonColor: '#2197a3',
    }).then(() => {
        // Actualizar el valor original de la suma asegurada
        sumaAseguradaOriginal = nuevaSuma;

        // Cambiar el estado de los botones
        document.getElementById('guardar-cambios').classList.remove('activo');
        document.getElementById('guardar-cambios').classList.add('oculto');
        document.getElementById('cancelar').classList.remove('activo');
        document.getElementById('cancelar').classList.add('oculto');

        document.getElementById('editar-suma').classList.remove('oculto');
        document.getElementById('editar-suma').classList.add('activo');

        // Deshabilitar el input y quitar la clase de edición
        inputSuma.disabled = true;
        inputSuma.classList.remove('editable');
    });
}


