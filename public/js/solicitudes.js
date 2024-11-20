// ----------------------------------------------------------------------------
// enviar cotización al solicitante  ------------------------------------------
// ----------------------------------------------------------------------------
function enviarCotizacion() {
    const emailField = document.getElementById('email');
    const celularField = document.getElementById('celular');
    const to = emailField.value;
    const celular = celularField.value;

    if (!to) {
        alert("No se pudo obtener la dirección de correo.");
        return;
    }
    
    if (!celular) {
        alert("No se pudo obtener el número de celular.");
        return;
    }

    const subject = "Respuesta sobre cotización Prisma Seguros S.A";
    const body = `Estimado,\n\n¡Gracias por su interés en Prisma Seguros! Hemos recibido su solicitud de cotización y nos gustaría presentarle nuestras exclusivas opciones de cobertura para proteger su vehículo de manera integral.\n\nContamos con tres planes adaptados a sus necesidades:\n\n- **Plan Básico**: Ideal para quienes buscan una protección esencial, este plan incluye cobertura contra daños a terceros, así como asistencia en carretera.\n- **Plan Intermedio**: Diseñado para ofrecer una cobertura más amplia, este plan incluye todo lo del plan básico, además de protección contra robo y daños propios, asegurando su tranquilidad en cualquier circunstancia.\n- **Plan Premium**: Nuestro plan más completo, que abarca todos los beneficios anteriores y suma un servicio de asesoría personalizada y coberturas adicionales, para que viaje siempre con la mejor protección.\n\nLe invitamos a considerar estos planes, que no solo le proporcionarán seguridad, sino también la confianza de saber que está en buenas manos.\n\nA continuación, le enviamos el valor de cada uno de los planes para su vehículo. Si tiene alguna consulta o desea contratar uno de estos planes, no dude en contactarnos. Estamos aquí para ayudarle a tomar la mejor decisión para su seguridad y la de su familia.\n\nSaludos atentamente,\nEl equipo de Prisma Seguros`;

    // Mostrar SweetAlert
    Swal.fire({
        title: 'Enviar Cotización',
        text: '¿Cómo desea enviar la cotización?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: '#25D366',
        confirmButtonText: 'Por Email',
        cancelButtonText: 'Cancelar',
        showDenyButton: true,
        denyButtonText: 'Por WhatsApp',
    }).then((result) => {
        if (result.isConfirmed) {
            // enviar por email
            const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink, '_blank');
        } else if (result.isDenied) {
            // enviar por WhatsApp
            const whatsappMessage = body.replace(/\n/g, '%0A');
            const whatsappLink = `https://api.whatsapp.com/send?phone=549${celular}&text=${encodeURIComponent(whatsappMessage)}`;  
            window.open(whatsappLink, '_blank');
        }
    });
}

// ----------------------------------------------------------------------------
// marcar las solicitudes como leído / no leído  ------------------------------
// ----------------------------------------------------------------------------
function marcarComoLeido(id) {
    fetch(`/solicitudes/${id}/marcar-leido`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al marcar la solicitud como leída.');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = `/solicitudes/${id}`; 
    })
    .catch(error => {
        console.error("Error al enviar la solicitud:", error);
        alert("Error en la solicitud.");
    });
}

// ----------------------------------------------------------------------------
// archivar las solicitudes  --------------------------------------------------
// ----------------------------------------------------------------------------
function archivarSolicitud(id) {
    fetch(`/archivar/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: 'Solicitud archivada',
                text: 'La solicitud ha sido archivada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = '/solicitudes';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al archivar la solicitud.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al archivar la solicitud.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}

// ----------------------------------------------------------------------------
// desarchivar las solicitudes  -----------------------------------------------
// ----------------------------------------------------------------------------
function desarchivarSolicitud(id) {
    fetch(`/solicitudes/${id}/desarchivar`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al desarchivar la solicitud');
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            title: 'Solicitud desarchivada',
            text: 'La solicitud ha sido desarchivada correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = `/solicitudes/archivadas`;
        });
    })
    .catch(error => {
        console.error("Error al desarchivar la solicitud:", error);
        alert("Error en la solicitud.");
    });
}

// ----------------------------------------------------------------------------
// ordenar por, filtrar por y buscar  -----------------------------------------
// ----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const ordenarLinks = document.querySelectorAll('.ordenar-menu-oculto a');
    const filtrarLinks = document.querySelectorAll('.filtrar-menu-oculto a');
    const buscador = document.querySelector('.buscador input');
    const tablaBody = document.querySelector('tbody');

    // función para ordenar por ID --
    function ordenarTabla(tipo) {
        const filas = Array.from(tablaBody.querySelectorAll('tr')).slice();
        const orden = tipo === 'recientes' ? (a, b) => b.cells[0].innerText - a.cells[0].innerText // id > primero
                                             : (a, b) => a.cells[0].innerText - b.cells[0].innerText; // id < primero

        filas.sort(orden);
        filas.forEach(fila => tablaBody.appendChild(fila)); // reordenar filas en la tabla
    }

    // función para filtrar por leído o no leído --
    function filtrarTabla(tipo) {
        const filas = Array.from(tablaBody.querySelectorAll('tr')).slice(1); 
        filas.forEach(fila => {
            const leido = fila.classList.contains('leido'); // verifica si la fila tiene la clase 'leido'
            if (tipo === 'leido' && !leido) {
                fila.style.display = 'none'; // oculta filas no leídas
            } else if (tipo === 'no-leido' && leido) {
                fila.style.display = 'none'; // oculta filas leídas
            } else {
                fila.style.display = ''; // muestra la fila
            }
        });
    }

    // evento de ordenar
    ordenarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const prop = this.dataset.sort;
            ordenarTabla(prop);
        });
    });

    // evento de filtrar
    filtrarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const tipo = this.dataset.filter;
            filtrarTabla(tipo);
        });
    });

    // Evento de buscar
    buscador.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const filas = Array.from(tablaBody.querySelectorAll('tr')).slice(1); 
        let found = false; // variable para rastrear si se encontraron resultados
    
        filas.forEach(fila => {
            const nombre = fila.cells[1].innerText.toLowerCase();
            // mostrar la fila si el nombre coincide, sin importar si es leída o no
            if (nombre.includes(query)) {
                fila.style.display = ''; // mostrar fila si el nombre coincide
                found = true; // se encontró al menos un resultado
            } else {
                fila.style.display = 'none'; // ocultar fila si no coincide
            }
        });
    
        // Mostrar SweetAlert si no se encuentran resultados
        // if (!found && query.trim() !== '') {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'No se encontraron resultados',
        //         text: `No hay clientes asociados al nombre "${query}".`,
        //         confirmButtonText: 'Aceptar'
        //     });
        // }
    });
    
});
