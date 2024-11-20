// ------------------------------------------------------------------------------------------
//                                 SECCIÓN: VEHÍCULOS ASEGURADOS
//-------------------------------------------------------------------------------------------

const menuHamburguesa = document.querySelector('.icon-menu');
const menu = document.querySelector('.menu');

const iconoBarras = document.querySelector('#icono-barras');
const iconoX = document.querySelector('#icono-x');

menuHamburguesa.addEventListener('click', () => {
    menu.classList.toggle('mostrar');
    iconoX.classList.toggle('mostrar');
    iconoBarras.classList.toggle('ocultar');
});

/* SOY ANITA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   comenté el fetch porque no es necesario usarlo
   los datos del usuario se cargan dinámicamente en el EJS desde el controlador
   fijate que si lo descomentas, el ID aparece como null en la URL `/obtener-vehiculos?idUsuario=${null}`,
   (fijate en la terminal de bash). Si no se entiende lo que quise poner preguntameeeeee :)
*/

// document.addEventListener('DOMContentLoaded', async () => {
//     const nombre = document.getElementById('nombre');
//     const tipoVehiculo = document.getElementById('tipo_vehiculo');
//     const patente = document.getElementById('patente');
//     const usoVehiculo = document.getElementById('uso_vehiculo');
//     const vigenciaDesde = document.getElementById('vigencia_desde');
//     const vigenciaHasta = document.getElementById('vigencia_hasta');
//     const marca = document.getElementById('id_marcas');
//     const modelo = document.getElementById('id_modelos');
//     const anio = document.getElementById('id_modeloanio');
//     const sumaAsegurada = document.getElementById('id_sumasegurada');
//     const tipoPlan = document.getElementById('tipo_plan');
//     const cuotaSeguro = document.getElementById('prima');
//     const premioTotal = document.getElementById('premio_total');

//     const urlParams = new URLSearchParams(window.location.search);
//     const idUsuario = urlParams.get('idUsuario');
//     console.log(idUsuario);

//     try {
//         const solicitudServidor = await fetch(`/obtener-vehiculos?idUsuario=${idUsuario}`);
//         const respServidor = await solicitudServidor.json();
//         console.log(respServidor);

//         if (respServidor.error) {
//             console.log(respServidor.error);
//             return;
//         }

//         nombre.value = respServidor['cliente nombre'] || '';
//         tipoVehiculo.value = respServidor.tipo_vehiculo || '';
//         patente.value = respServidor.patente || '';
//         usoVehiculo.value = respServidor.uso_vehiculo || '';
//         vigenciaDesde.value = respServidor.vigencia_desde || '';
//         vigenciaHasta.value = respServidor.vigencia_hasta || '';
//         marca.value = respServidor.marca || '';
//         modelo.value = respServidor.modelo || '';
//         anio.value = respServidor['año'] || '';
//         sumaAsegurada.value = respServidor['suma asegurada'] || '';
//         tipoPlan.value = respServidor.tipo_plan || '';
//         cuotaSeguro.value = respServidor['cuota de seguro'];
//         premioTotal.value = respServidor.premio_total || '';

//     } catch (error) {
//         console.error('Error en la solicitud al servidor:', error);
//     }
// });