document.addEventListener("DOMContentLoaded", function () {
    const ordenarLinks = document.querySelectorAll('.ordenar-menu-oculto a');
    const filtrarLinks = document.querySelectorAll('.filtrar-menu-oculto a');
    const tablaBody = document.querySelector('tbody');

    // función para ordenar por nombre
    function ordenarPorNombre(tipo) {
        const filas = Array.from(tablaBody.querySelectorAll('tr')).slice();
        const orden = tipo === 'a-z'
            ? (a, b) => a.cells[1].innerText.localeCompare(b.cells[1].innerText) // A - Z
            : (a, b) => b.cells[1].innerText.localeCompare(a.cells[1].innerText); // Z - A

        filas.sort(orden);
        filas.forEach(fila => tablaBody.appendChild(fila)); // reordenar filas en la tabla
    }

    // función para filtrar por vehículo
    function filtrarPorVehiculo(tipo) {
        const filas = Array.from(tablaBody.querySelectorAll('tr')).slice(); 
        filas.forEach(fila => {
            const vehiculo = fila.dataset.vehiculo; // obtiene el tipo de vehículo desde el data attribute
            if (tipo === 'auto' && vehiculo !== 'Auto') {
                fila.style.display = 'none'; // oculta filas que no son auto
            } else if (tipo === 'moto' && vehiculo !== 'Moto') {
                fila.style.display = 'none'; // oculta filas que no son moto
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
            ordenarPorNombre(prop);
        });
    });

    // evento de filtrar
    filtrarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const tipo = this.dataset.filter;
            filtrarPorVehiculo(tipo);
        });
    });
});

const inputBusqueda = document.getElementById('buscar-cliente');
const tablaBody = document.querySelector('table tbody');

inputBusqueda.addEventListener('input', function() {
    const textoBusqueda = this.value.toLowerCase();
    const filas = tablaBody.querySelectorAll('tr');
    
    filas.forEach(fila => {
        const nombreCliente = fila.cells[1]?.textContent.toLowerCase(); 
        
        if (nombreCliente && nombreCliente.includes(textoBusqueda)) {
            fila.style.display = ''; 
        } else {
            fila.style.display = 'none';
        }
    });
});


// ------------------------------------------------------------------------------------------
//                                 ARCHIVAR / DESARCHIVAR CLIENTES
//-------------------------------------------------------------------------------------------

function darDeBajaCliente(id) {
    Swal.fire({
        title: '¿Estás seguro que lo querés dar de baja?',
        text: "Los clientes dados de baja se guardarán en el apartado 'Ver clientes dados de baja'",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, dar de baja',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            archivarCliente(id);
        }
    });
}

function archivarCliente(id) {
    fetch(`/archivar_cliente/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('data:', data);
        if (data.success) {
            console.log('dsasadas', data.success);
            
            Swal.fire({
                title: 'Cliente dado de baja',
                text: 'El cliente fue dado de baja correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = '/vistaClientes';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al dar de baja al cliente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
        console.log(id);
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error al dar de baja al cliente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}

// ------------------------------------------------------------------------------------------
//                                 DESARCHIVAR CLIENTES
//-------------------------------------------------------------------------------------------

function desarchivarCliente(id) {
    fetch(`/vistaClientes/${id}/desarchivar`, {
        method: 'PUT',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al desarchivar el cliente.');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            console.log("data success", data.message);
            
            Swal.fire({
                title: 'Cliente dado de alta',
                text: 'El cliente fue dado de alta correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = '/vistaClientes/archivados';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema en dar de alta el cliente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    })
    .catch(error => {
        console.error("Error al desarchivar el cliente:", error);
    });
}

