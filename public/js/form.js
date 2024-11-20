// ------------------------------------------------------------------------------------------------
// mostrar datos precargados al cliente desde el servidor (marca y modelo del vehículo) -----------
// ------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const tipoSelect = document.getElementById('tipo');
  const marcaSelect = document.getElementById('idMarca');
  const modeloSelect = document.getElementById('idModelo');
  const anioSelect = document.getElementById('anio');

  // carga de marcas cuando se selecciona un tipo de vehículo 
  tipoSelect.addEventListener('change', async () => {
      const tipo = tipoSelect.value;

      // solicitar marcas según el tipo seleccionado
      const solicitudServer = await fetch(`/obtener-marcas?tipo=${tipo}`);
      const respServer = await solicitudServer.json();

      if (respServer.error) {
          console.error(respServer.error);
          return;
      }

      // reiniciar las opciones del campo marca
      marcaSelect.innerHTML = '<option value="" disabled selected>Selecciona una marca</option>'; 

      respServer.data.forEach(marca => {
          marcaSelect.innerHTML += `<option value="${marca.id_marcas}">${marca.nombre}</option>`;
      });

      // reiniciar las opciones del campo modelo
      modeloSelect.innerHTML = '<option value="" disabled selected >Seleccione un modelo</option>';
  });

  // carga de modelos cuando se selecciona una marca 
  marcaSelect.addEventListener('change', async () => {
      const idMarca = marcaSelect.value;
      const tipo = tipoSelect.value;
      // solicitar modelos según la marca seleccionada
      const solicitudServer = await fetch(`/obtener-modelos/${idMarca}?tipo=${tipo}`);
      const respServer = await solicitudServer.json();

      // reiniciar las opciones del campo modelo
      modeloSelect.innerHTML = '<option value="" disabled selected>Selecciona un modelo</option>'; 

      respServer.forEach(modelo => {
          modeloSelect.innerHTML += `<option value="${modelo.id_modelos}">${modelo.nombre}</option>`;
        });
    });

    modeloSelect.addEventListener('change', async () => {
        const id_modelos = modeloSelect.value;
        console.log('Modelo seleccionado:', id_modelos); 
    
        try {
            const solicitudServidor = await fetch(`/obtener-anios/${id_modelos}`);
            const respServidor = await solicitudServidor.json();
            console.log("Respuesta completa del servidor para los años:", respServidor);
    
            if (Array.isArray(respServidor)) {

                
                anioSelect.innerHTML = '<option value="" disabled selected>Selecciona el año de fabricación</option>';

                respServidor.forEach(anioArray => {
                    
                    anioSelect.innerHTML += `<option value="${anioArray.id_modelo_anio}">${anioArray.anio}</option>`;
                });
            } else {
                console.error("La respuesta no contiene un array válido.");
            }
        } catch (error) {
            console.error("Error al cargar años:", error);
        }
    });
    
});

// ------------------------------------------------------------------------------------------------
// Enviar el form sin recargar la pág. y mostrar msj de éxito  ------------------------------------
// ------------------------------------------------------------------------------------------------

// aceptar tyc sino no se puede avanzar
document.getElementById('terminos-link').addEventListener('click', () => {
    Swal.fire({
        title: 'Términos y Condiciones',
        html: `
            <div style="max-height: 200px; font-size: 18px; text-align: justify;">
                <p>Al utilizar este servicio, usted acepta y se compromete a cumplir con los términos y condiciones que a continuación se detallan, los cuales regulan el uso de la plataforma y los servicios ofrecidos. Este acuerdo es vinculante y de carácter obligatorio para todos los usuarios.</p>
                <p>Los datos personales proporcionados en el formulario de registro serán utilizados exclusivamente para la gestión de sus solicitudes, así como para mantener el contacto y la comunicación con el usuario en relación con los productos y servicios de nuestra plataforma. En ningún caso se utilizarán con fines comerciales, ni serán cedidos a terceros sin su previo consentimiento, salvo en los casos expresamente establecidos por la Ley N° 25.326 de Protección de Datos Personales de la República Argentina.</p>
                <p>El tratamiento de los datos se realizará de acuerdo con lo establecido por la legislación argentina vigente, respetando los principios de calidad, finalidad, necesidad y proporcionalidad de los datos recopilados. De acuerdo con la Ley N° 25.326, el usuario tiene derecho a acceder, rectificar y suprimir los datos personales que nos ha proporcionado, de acuerdo con el procedimiento establecido en nuestra política de privacidad.</p>
                <p>El usuario podrá ejercitar estos derechos en cualquier momento, sin costo alguno, a través de los medios de contacto disponibles en la plataforma. En caso de que se considere que sus derechos sobre la privacidad o la protección de sus datos han sido vulnerados, el usuario podrá presentar una denuncia ante la Agencia de Acceso a la Información Pública, organismo encargado de velar por la protección de los datos personales en Argentina.</p>
                <p>Este servicio no compartirá los datos personales con terceros sin el consentimiento explícito del usuario, salvo en aquellos casos en que sea necesario para cumplir con la legislación vigente, o cuando sea requerido para la correcta prestación de los servicios solicitados. El uso de los datos también podrá ser utilizado para enviar información relevante acerca de cambios en los productos y servicios ofrecidos, siempre respetando las preferencias de comunicación indicadas por el usuario.</p>
                <p>Al aceptar estos términos y condiciones, el usuario autoriza el tratamiento de sus datos conforme a lo aquí detallado. Asimismo, el usuario se compromete a proporcionar información veraz y actualizada en todo momento. En caso de que se detecten datos incorrectos o falsos, el servicio se reserva el derecho de suspender o cancelar la cuenta del usuario.</p>
                <p>El presente acuerdo podrá ser modificado por el prestador del servicio en cualquier momento. Las modificaciones entrarán en vigor en el momento de su publicación en la plataforma, por lo que se recomienda al usuario revisar periódicamente los términos y condiciones para mantenerse informado sobre los cambios que puedan producirse.</p>
            </div>
        `,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#2197a3',
        width: '70%',
        showCloseButton: true,
    });
});

document.getElementById('aceptar-terminos').addEventListener('change', (e) => {
    const aceptarCheckbox = e.target;
    const btn = document.getElementById('botonCotizar');
    if (aceptarCheckbox.checked) {
        console.log('Usuario ha aceptado los términos');
        btn.classList.remove('desactivado');
        btn.classList.add('activo');
    } else {
        btn.classList.remove('activo');
        btn.classList.add('desactivado');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCotizacion');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let esValido = true;
        let mensajesDeError = [];

        // limpia mensajes de error
        document.querySelectorAll('.error').forEach(el => el.textContent = '');

        // validación de tipo de vehículo
        const tipo = document.getElementById('tipo').value;
        if (!tipo) {
            mensajesDeError.push('Por favor, selecciona un tipo de vehículo.');
            esValido = false;
        }

        // validación de patente
        const patente = document.getElementById('patente').value;
        const patenteVal = /^(?:[A-Z]{2}\d{3}[A-Z]{2}|\d{3}[A-Z]{3})$/i; // formato viejo y nuevo
        if (!patenteVal.test(patente)) {
            mensajesDeError.push('La patente debe tener un formato válido: AA123BB o 123ABC.');
            esValido = false;
        }

        // validación de año
        const anio = document.getElementById('anio').value;
        if (!anio) {
            mensajesDeError.push('Seleccione un año');
            esValido = false;
        }

        // validación de marca
        const marca = document.getElementById('idMarca').value;
        if (!marca) {
            mensajesDeError.push('Selecciona una marca.');
            esValido = false;
        }

        // validación de modelo
        const modelo = document.getElementById('idModelo').value;
        if (!modelo) {
            mensajesDeError.push('Selecciona un modelo.');
            esValido = false;
        }

        // validación de nombre
        const nombre = document.getElementById('nombre').value;
        if (!nombre) {
            mensajesDeError.push('Ingresa tu nombre.');
            esValido = false;
        }

        // validación de apellido
        const apellido = document.getElementById('apellido').value;
        if (!apellido) {
            mensajesDeError.push('Ingresa tu apellido.');
            esValido = false;
        }

        // validación de celular
        const celular = document.getElementById('celular').value;
        const celularVal = /^[0-9]{10}$/;
        if (!celularVal.test(celular)) {
            mensajesDeError.push('El celular debe ser un número de 10 dígitos.');
            esValido = false;
        }

        // validación de email
        const email = document.getElementById('email').value;
        const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal.test(email)) {
            mensajesDeError.push('Ingresa una dirección de correo electrónico válida: ejemplo@ejemplo.com');
            esValido = false;
        }

        // si no es válido, mostrar el error y detener el envío
        if (!esValido) {
            Swal.fire({
                icon: 'error',
                title: 'Errores en la carga de datos',
                text: mensajesDeError.join(' '),
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'btn-confirm'
                }
            });
            return; 
        }

        // si es válido, continuar con el envío del formulario
        const formData = {
            tipo: tipo,
            patente: patente,
            anio: anio,
            idMarca: marca,
            idModelo: modelo,
            nombre: nombre,
            apellido: apellido,
            celular: celular,
            email: email
        };

        fetch('/guardar-datos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: '¡Cotización enviada!',
                text: 'Tu cotización ha sido enviada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = '/';
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al enviar la cotización.',
                icon: 'error',
                confirmButtonText: 'Reintentar'
            });
            console.error('Error:', error);
        });
    });
});
