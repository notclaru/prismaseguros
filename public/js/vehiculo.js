// ----------------------------------------------------------------------------
// tabs: mostrar 'vehiculo' y ocultar 'datos' ---------------------------------
// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const datosPersonalesTab = document.getElementById('datos-personales-tab');
    const vehiculosTab = document.getElementById('vehiculos-tab');

    datosPersonalesTab.classList.add('tabDesactivado');
    datosPersonalesTab.classList.remove('tabActivo'); 
    vehiculosTab.classList.remove('tabDesactivado'); 
    vehiculosTab.classList.add('tabActivo'); 
});

// ----------------------------------------------------------------------------
// modo edición y gestión de cambios -----------------------------------------
// ----------------------------------------------------------------------------

// let editModo = false; // modo edición desactivado 
// let datosCompletos = {}; 
// let cambiosRealizados = false; // no hay cambios hechos

// // función que decide qué hacer según el botón clickeado --
// function accionBoton(accion) {
//     if (accion === 'editar') {
//         editarPerfil();
//     } else if (accion === 'cancelar') {
//         cancelarEdicion();
//     }
// }

// // función para editar perfil --
// function editarPerfil() {
//     const botonEmitirPoliza = document.getElementById('emitir-poliza'); 
//     const botonEditar = document.getElementById('editar-perfil'); 
//     const botonAgregarVehiculo = document.getElementById('agregar-vehiculo');
//     const botonGuardar = document.getElementById('guardar');
//     const botonCancelar = document.getElementById('cancelar');

//     // activar el modo edición
//     editModo = true;

//     // ocultar botones
//     botonEmitirPoliza.classList.remove('activo');
//     botonEmitirPoliza.classList.add('oculto');
//     botonEditar.classList.remove('activo');
//     botonEditar.classList.add('oculto');

//     // mostrar botones de agregar vehículo, guardar y cancelar
//     botonAgregarVehiculo.classList.remove('oculto');
//     botonAgregarVehiculo.classList.add('activo');
//     botonGuardar.classList.remove('oculto');
//     botonGuardar.classList.add('desactivado');
//     botonCancelar.classList.remove('oculto');
//     botonCancelar.classList.add('activo');

//     // habilitar inputs y añadir clase editable
//     // Definir los IDs de los elementos que deben poder editarse
//     const elementosEditablesIds = [
//         'vigencia_desde',
//         'vigencia_hasta',
//         'tipo_seguro',
//         'suma_asegurada',
//         'premio_total',
//         'prima'
//     ];

//     // seleccionar y habilitar solo los elementos específicos
//     document.querySelectorAll('input, select').forEach(input => {
//         if (elementosEditablesIds.includes(input.id)) {
//             // almacenar los valores iniciales de los inputs
//             datosCompletos[input.name] = input.value;

//             // habilitar inputs y añadir clase editable
//             input.disabled = false;
//             input.classList.add('editable');

//             // detectar cambios en los inputs
//             input.addEventListener('input', (e) => {
//                 // comparar el valor inicial con el valor actual
//                 if (datosCompletos[e.target.name] !== e.target.value) {
//                     cambiosRealizados = true;
//                 }
//                 // actualizar el objeto con el nuevo valor
//                 datosCompletos[e.target.name] = e.target.value;

//                 // habilitar el botón de guardar si hay cambios
//                 botonGuardar.disabled = !cambiosRealizados;
//                 botonGuardar.classList.toggle('desactivado', !cambiosRealizados);
//                 botonGuardar.classList.toggle('activo', cambiosRealizados);
//             });
//         }
//     });
// }

// // fecth para guardar los cambios en los inputs/select en el servidor --
// async function guardarCambios() {
//     // si no hay cambios, no hacer nada
//     if (Object.keys(datosModificados).length === 0) {
//         return;
//     }

//     try {
//         // CAMBIAR RUTAAAAAAAAAA!!!!!!!!!!!!!!!
//         const response = await fetch('/ruta_guardar', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(datosModificados) 
//         });

//         if (response.ok) {
//             const result = await response.json();
//             console.log('Datos guardados correctamente:', result);

//             Swal.fire({
//                 title: '¡Excelente!',
//                 text: 'Los cambios se han guardado correctamente',
//                 icon: 'success',
//                 confirmButtonColor: '#2197a3', 
//             }).then(() => {
//                 datosModificados = {};
//                 document.getElementById('guardar').disabled = true;
//                 window.location.reload();
//             });
//         } else {
//             console.error('Error al guardar los datos:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error de conexión:', error);
//     }
// }

// // función para cancelar la edición --
// function cancelarEdicion() {
//     Swal.fire({
//         title: '¿Está seguro?',
//         text: "Se perderán los cambios no guardados.",
//         icon: 'warning',
//         confirmButtonColor: '#2197a3', 
//         confirmButtonText: 'Confirmar',
//         showCloseButton: true, 
//         closeButtonHtml: '<span class="swal2-x-mark">×</span>', 
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // deshabilitar inputs
//             document.querySelectorAll('input').forEach(input => {
//                 input.disabled = true;
//             });

//             const botonEmitirPoliza = document.getElementById('emitir-poliza'); 
//             const botonEditar = document.getElementById('editar-perfil'); 
//             const botonArchivar = document.getElementById('archivar-cliente');
//             const botonAgregarVehiculo = document.getElementById('agregar-vehiculo');
//             const botonGuardar = document.getElementById('guardar');
//             const botonCancelar = document.getElementById('cancelar');
            
//             // ocultar botones
//             botonEmitirPoliza.classList.remove('oculto');
//             botonEmitirPoliza.classList.add('activo');
//             botonEditar.classList.remove('oculto');
//             botonEditar.classList.add('activo');
//             botonArchivar.classList.remove('oculto');
//             botonArchivar.classList.add('activo');
            
//             // mostrar botones
//             botonAgregarVehiculo.classList.remove('activo');
//             botonAgregarVehiculo.classList.add('oculto');
//             botonGuardar.classList.remove('activo');
//             botonGuardar.classList.add('oculto');
//             botonCancelar.classList.remove('activo');
//             botonCancelar.classList.add('oculto');
            
//             editModo = false;
//             cambiosGuardados = false;

//             window.location.reload();
//         }
//     });
// }

// ----------------------------------------------------------------------------
// buscar las fotos y mostrarlas  ---------------------------------------------
// ----------------------------------------------------------------------------

function verFotos(idCliente) {
    fetch(`/fotos/${idCliente}`) //CAMBIAR LA RUTA !!!!!!!!!!!!!!!!!!!
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las fotos');
            }
            return response.json();
        })
        .then(data => {
            mostrarFotos(data.fotos); 
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las fotos',
            });
        });
}

function mostrarFotos(fotos) {
    const contenido = fotos.map(foto => `<img src="${foto}" alt="Foto del vehículo" style="width: 100%; margin-bottom: 10px;">`).join('');

    Swal.fire({
        title: 'Fotos del Vehículo',
        html: contenido,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Cerrar',
        customClass: {
            popup: 'my-swal-popup'
        }
    });
}

// ----------------------------------------------------------------------------
// modal para agregar otro vehiculo -------------------------------------------
// ----------------------------------------------------------------------------

// función para abrir el modal
function abrirModal() {
    document.getElementById('modalAgregarVehiculo').classList.remove('oculto');
}

// función para cerrar el modal
function cerrarModal() {
    document.getElementById('modalAgregarVehiculo').classList.add('oculto');
}

// guardar en el modal
document.getElementById('guardarCambiosModal').onclick = async function() {
    const tipoVehiculo = document.getElementById('tipo_vehiculo').value;
    const patente = document.getElementById('patente').value;
    const usoVehiculo = document.getElementById('uso_vehiculo').value;
    const vigenciaDesde = document.getElementById('vigencia_desde').value;
    const vigenciaHasta = document.getElementById('vigencia_hasta').value;
    const idMarca = document.getElementById('idMarca').value;
    const idModelo = document.getElementById('idModelo').value;
    const anio = document.getElementById('anio').value;
    const tipoSeguro = document.getElementById('tipo_seguro').value;

    // validar que los campos requeridos no estén vacíos
    if (!tipoVehiculo || !patente || !usoVehiculo || !vigenciaDesde || !vigenciaHasta) {
        alert("Por favor complete todos los campos requeridos.");
        return;
    }

    const datosVehiculo = {
        tipoVehiculo,
        patente,
        usoVehiculo,
        vigenciaDesde,
        vigenciaHasta,
        idMarca,
        idModelo,
        anio,
        tipoSeguro
    };

    try {
        // CAMBIAR RUTAAAA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const response = await fetch('/ruta_guardar_vehiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosVehiculo) 
        });

        if (!response.ok) {
            throw new Error('Error al guardar los datos');
        }

        const result = await response.json();
        console.log('Vehículo guardado:', result);

        Swal.fire({
            title: 'Éxito',
            text: 'Vehículo guardado correctamente.',
            icon: 'success',
            confirmButtonColor: '#2197a3', 
        }).then(() => {
            cerrarModal(); 
            location.reload(); 
        });

    } catch (error) {
        console.error('Error al guardar el vehículo:', error);
        Swal.fire({
            title: 'Error',
            text: 'Error al guardar el vehículo: ' + error.message,
            icon: 'error',
            confirmButtonColor: '#2197a3', 
        });
    }
};

