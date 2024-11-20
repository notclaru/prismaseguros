/*
	MOSTRAR / OCULTAR CONTRASEÑA CON CHECKBOX --
	se asigna un evento `change` al checkbox con id `toggle-password-checkbox`.
    cuando el checkbox es marcado, se cambia el tipo del campo de contraseña (con id `claveActual`) 
    de 'password' a 'text', permitiendo que el usuario vea la contraseña ingresada.
    si el checkbox es desmarcado, el tipo del campo se cambia nuevamente a 'password',
    ocultando la contraseña.
*/

document.getElementById('toggle-password-checkbox').addEventListener('change', function () {
    const passwordInput = document.getElementById('claveActual');

    if (this.checked) {
        passwordInput.type = 'text'; 
    } else {
        passwordInput.type = 'password'; 
    }
});

/*
	CAMBIAR CONTRASEÑA --
	se asigna un evento `click` al botón con la clase `boton-accion`.
    se obtienen los valores de los campos de la contraseña actual, la nueva contraseña y su
    confirmación verificando si coinciden. si lo hacen, valida la contraseña actual haciendo una
    solicitud fetch al endponint /validar-credencial, si se valida exitosamente se crea un objeto
    `data` que contiene la nueva clave, si no, se muestra con msj de error. luego, se hace una 
    solicitud fetch al endpoint `/cambiar-credencial` para enviar la nueva contraseña al servidor.
*/

document.querySelector('.boton-accion').addEventListener('click', async (event) => {
    event.preventDefault();

    const claveActualInput = document.getElementById('claveActual');
    const nuevaClaveInput = document.getElementById('nuevaClave');
    const confirmarClaveInput = document.getElementById('confirmarClave');
    const recuperarClave = document.getElementById('recuperar-clave');

    const claveActual = claveActualInput.value;
    const nuevaClave = nuevaClaveInput.value;
    const confirmarClave = confirmarClaveInput.value;

    // verificar si las contraseñas nuevas coinciden
    if (nuevaClave !== confirmarClave) {
        nuevaClaveInput.classList.add('error-validacion');
        confirmarClaveInput.classList.add('error-validacion');

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'La nueva contraseña y la confirmación no coinciden.',
            confirmButtonColor: '#2197a3',
        });
        return;
    }

    try {
        // validar la contraseña actual
        const responseActual = await fetch('/validar-credencial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ claveActual }),
        });

        const resultadoActual = await responseActual.json();

        if (!responseActual.ok) {
            claveActualInput.classList.add('error-validacion');
            recuperarClave.classList.remove('ocultar');
            recuperarClave.classList.add('mostrar');

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultadoActual.message || 'La contraseña actual es incorrecta.',
                confirmButtonColor: '#2197a3',
            });
            return;
        }

        // si la contraseña actual es válida, continuar con el cambio de contraseña
        const data = { clave: nuevaClave };
        const response = await fetch('/cambiar-credencial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Contraseña cambiada exitosamente.',
                confirmButtonColor: '#2197a3',
            });

            location.reload();
        } else {
            alert(result.message || "Hubo un error al cambiar la contraseña.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Hubo un problema con la solicitud.");
    }
});

