// ----------------------------------------------------------------------------
// Mostrar 'datos' y ocultar 'vehiculos' -------------------------------------
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const datosPersonalesTab = document.getElementById('datos-personales-tab');
    const vehiculosTab = document.getElementById('vehiculos-tab');

    datosPersonalesTab.classList.add('tabActivo');
    vehiculosTab.classList.remove('tabActivo');
    vehiculosTab.classList.add('tabDesactivado');
    datosPersonalesTab.classList.remove('tabDesactivado');
});

// ----------------------------------------------------------------------------
// Modo edición y gestión de cambios -----------------------------------------
// ----------------------------------------------------------------------------

let editModo = false; // modo edición desactivado 
let datosCompletos = {}; 
let cambiosRealizados = false; // no hay cambios hechos

// función que decide qué hacer según el botón clickeado --
function accionBoton(accion) {
    if (accion === 'editar') {
        editarPerfil();
    } else if (accion === 'cancelar') {
        cancelarEdicion();
    }
}

// función para editar perfil --
function editarPerfil() {
    const botonEmitirPoliza = document.getElementById('emitir-poliza'); 
    const botonEditar = document.getElementById('editar-perfil'); 
    // const botonAgregarVehiculo = document.getElementById('agregar-vehiculo');
    const botonGuardar = document.getElementById('guardar');
    const botonCancelar = document.getElementById('cancelar');

    // activar el modo edición
    editModo = true;

    // ocultar botones
    botonEmitirPoliza.classList.remove('activo');
    botonEmitirPoliza.classList.add('oculto');
    botonEditar.classList.remove('activo');
    botonEditar.classList.add('oculto');

    // mostrar botones de agregar vehículo, guardar y cancelar
    // botonAgregarVehiculo.classList.remove('oculto');
    // botonAgregarVehiculo.classList.add('activo');
    botonGuardar.classList.remove('oculto');
    botonGuardar.classList.add('desactivado');
    botonCancelar.classList.remove('oculto');
    botonCancelar.classList.add('activo');

    // habilitar inputs y añadir clase editable
    document.querySelectorAll('input, select').forEach(input => {
        // almacenar los valores iniciales de los inputs
        datosCompletos[input.name] = input.value;

        // habilitar inputs y añadir clase editable
        const camposEditables = [
            // document.getElementById('email'),
            document.getElementById('direccion'),
            document.getElementById('celular'),
            document.getElementById('ciudad'),
            document.getElementById('provincia')
        ];
    
        camposEditables.forEach(input => {
            input.disabled = false;
            input.classList.add('editable');
        });

        // detectar cambios en los inputs
        input.addEventListener('input', (e) => {
            // comparar el valor inicial con el valor actual
            if (datosCompletos[e.target.name] !== e.target.value) {
                cambiosRealizados = true;
            }
            // actualizar el objeto con el nuevo valor
            datosCompletos[e.target.name] = e.target.value;

            // habilitar el botón de guardar si hay cambios
            botonGuardar.disabled = !cambiosRealizados;
            botonGuardar.classList.toggle('desactivado', !cambiosRealizados);
            botonGuardar.classList.toggle('activo', cambiosRealizados);
        });
    });
}

// función para guardar cambios --
async function guardarCambios() {
    
    try {
        // ruta cambiada
        const response = await fetch('/perfil_usuario/${datosCompletos.dni}/editar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosCompletos) 
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Datos guardados correctamente:', result);

            Swal.fire({
                title: '¡Excelente!',
                text: 'Los cambios se han guardado correctamente',
                icon: 'success',
                confirmButtonColor: '#2197a3', 
            }).then(() => {
                // reiniciar datos y recargar la página
                datosCompletos = {};
                cambiosRealizados = false;
                // document.getElementById('guardar').disabled = true;
                window.location.reload();
            });
        } else {
            console.error('Error al guardar los datos:', response.statusText);
        }
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

// función para cancelar la edición --
function cancelarEdicion() {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Se perderán los cambios no guardados.",
        icon: 'warning',
        confirmButtonColor: '#2197a3', 
        confirmButtonText: 'Confirmar',
        showCloseButton: true, 
        closeButtonHtml: '<span class="swal2-x-mark">×</span>', 
    }).then((result) => {
        if (result.isConfirmed) {
            // deshabilitar inputs
            document.querySelectorAll('input, select').forEach(input => {
                input.disabled = true;
                input.classList.remove('editable');
            });

            const botonEmitirPoliza = document.getElementById('emitir-poliza'); 
            const botonEditar = document.getElementById('editar-perfil'); 
            const botonGuardar = document.getElementById('guardar');
            const botonCancelar = document.getElementById('cancelar');

            // mostrar botones originales
            botonEmitirPoliza.classList.remove('oculto');
            botonEmitirPoliza.classList.add('activo');
            botonEditar.classList.remove('oculto');
            botonEditar.classList.add('activo');
            
            // ocultar botones de guardar y cancelar
            botonGuardar.classList.remove('activo');
            botonGuardar.classList.add('oculto');
            botonCancelar.classList.remove('activo');
            botonCancelar.classList.add('oculto');
            
            // resetear estados
            editModo = false;
            cambiosRealizados = false;

            window.location.reload();
        }
    });
}
