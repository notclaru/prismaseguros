// Menú interactivo
const menuHamburguesa = document.querySelector('.icon-menu');
const menu = document.querySelector('.menu');

const iconoBarras = document.querySelector('#icono-barras');
const iconoX = document.querySelector('#icono-x');

menuHamburguesa.addEventListener('click', () => {
    menu.classList.toggle('mostrar');
    iconoX.classList.toggle('mostrar');
    iconoBarras.classList.toggle('ocultar');
});

// ------------------------------------------------------------------------------------------
//                                 SECCIÓN: DATOS PERSONALES
//-------------------------------------------------------------------------------------------

/* SOY ANITA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   comenté el fetch porque no es necesario usarlo
   los datos del usuario se cargan dinámicamente en el EJS desde el controlador
   fijate que si lo descomentas, el ID aparece como null en la URL `/obtener-usuario?idUsuario=${null}`,
   (fijate en la terminal de bash). Si no se entiende lo que quise poner preguntameeeeee :)
*/

// document.addEventListener('DOMContentLoaded', async () => {
//     const nombre = document.getElementById('nombre');
//     const apellido = document.getElementById('apellido');
//     const dni = document.getElementById('dni');
//     const email = document.getElementById('email');
//     const celular = document.getElementById('celular');
//     const direccion = document.getElementById('direccion');
//     const ciudad = document.getElementById('ciudad');
//     const provincia = document.getElementById('provincia');

//     // const urlParams = new URLSearchParams(window.location.search);
//     // const idUsuario = urlParams.get('id_usuarios');
//     // console.log(idUsuario);

//     try {
//         const solicitudServidor = await fetch(`/obtener-usuario?idUsuario=${idUsuario}`);
//         console.log("solicitud del servidor front", solicitudServidor);
        
//         const respServidor = await solicitudServidor.json();
//         console.log("resp del servidor front", respServidor);

//         if (respServidor.error) {
//             console.log(respServidor.error);
//             return;
//         }

//         nombre.value = respServidor.nombre || '';
//         apellido.value = respServidor.apellido || '';
//         dni.value = respServidor.dni || '';
//         email.value = respServidor.email || '';
//         celular.value = respServidor.celular || '';
//         direccion.value = respServidor.direccion || '';
//         ciudad.value = respServidor.ciudad || '';
//         provincia.value = respServidor.provincia || ''; 


//     } catch (error) {
//         console.error('Error en la solicitud al servidor:', error);
//     }
// });

// ------------------------------------------------------------------------------------------
//                          EDICIÓN DE DATOS PERSONALES (EMIAL Y CELULAR)
//-------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // seleccionar los botones
    const editarBtn = document.querySelector('.editar');
    const guardarBtn = document.querySelector('.guardar');
    const cancelarBtn = document.querySelector('.cancelar');

    // selecciona todos los inputs que tienen las clases 'dato' y 'dato1' y los convierte en un array
    const inputs = Array.from(document.querySelectorAll('.dato, .dato1'));
    let valoresOriginales = {}; // objeto para almacenar los valores originales de los inputs

    // función para activar el modo edición --
    editarBtn.addEventListener('click', () => {
        // mostrar los botones de guardar y cancelar, y esconder el botón de editar
        guardarBtn.classList.add('mostrar');
        cancelarBtn.classList.add('mostrar');
        editarBtn.classList.add('esconder');

        // almacenar los valores originales de los inputs y habilita la edición
        inputs.forEach(input => {
            valoresOriginales[input.id] = input.value; // guardar los valores originales
            input.disabled = false; // habilitar el input para editar
            input.classList.add('modo-edicion'); // agregar clase CSS
        });
    });

    // función para cancelar la edición --
    cancelarBtn.addEventListener('click', () => {
        editarBtn.classList.remove('esconder');
        guardarBtn.classList.remove('mostrar');
        cancelarBtn.classList.remove('mostrar');

        // restaurar los valores originales en los inputs y deshabilitar la edición
        inputs.forEach(input => {
            input.value = valoresOriginales[input.id]; // restaura el valor original
            input.disabled = true; // deshabilitar el input
            input.classList.remove('modo-edicion'); // remover la clase CSS
        });
    });

    // función para guardar los cambios --
    guardarBtn.addEventListener('click', async () => {
        const datosCompletos = {}; // objeto para almacenar los datos a enviar

        // almacenar los valores actuales de los inputs en datosCompletos
        inputs.forEach(input => {
            datosCompletos[input.id] = input.value; // guarda el valor actual
            input.classList.remove('modo-edicion'); // remueve la clase de CSS
            input.disabled = true; // deshabilita el input desp de guardar
        });

        // obtiene el valor del DNI para usarlo en el fetch
        const dni = document.getElementById('dni').value;
        console.log('DNI:', dni); // ANDA en consola del navegador

        try {
            const response = await fetch(`/perfil_usuario/${dni}/editar`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(datosCompletos), 
            });

            if (response.ok) {
                const result = await response.json(); 
                console.log('Datos guardados correctamente:', result); // ANDA en consola del navegador

                // mostrar msj con SweetAlert
                Swal.fire({
                    title: '¡Excelente!',
                    text: 'Los cambios se han guardado correctamente',
                    icon: 'success',
                    confirmButtonColor: '#2197a3',
                }).then(() => {
                    window.location.reload(); // recargar la página 
                });
            } else {
                const errorResponse = await response.json();
                console.error('Error al guardar los datos:', errorResponse.mensaje); 
            }
        } catch (error) {
            console.error('Error de conexión:', error); 
        }

        editarBtn.classList.remove('esconder'); // mosytrat el botón de editar
        guardarBtn.classList.remove('mostrar'); // ocultar el botón de guardar
        cancelarBtn.classList.remove('mostrar'); // ocultar el botón de cancelar
    });
});

