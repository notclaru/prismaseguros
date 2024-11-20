// función p menú responsive --------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const iconoMenuResponsive = document.querySelector(".fi-rr-menu-burger");
    const menuResponsive = document.querySelector(".menu");
    const iconoCerrar = document.querySelector(".fi-br-cross");

    function toggleMenu() {
        menuResponsive.classList.toggle("activo");

        if (menuResponsive.classList.contains("activo")) {
            iconoMenuResponsive.classList.add("oculto");
            iconoCerrar.classList.remove("oculto");
            iconoCerrar.classList.add("x-rojo");
        } else {
            iconoMenuResponsive.classList.remove("oculto");
            iconoCerrar.classList.add("oculto");
            iconoCerrar.classList.remove("x-rojo");
        }
    }

    // cerrar el menú cuando se haga clic en un enlace
    function closeMenu() {
        menuResponsive.classList.remove("activo");
        iconoMenuResponsive.classList.remove("oculto");
        iconoCerrar.classList.add("oculto");
        iconoCerrar.classList.remove("x-rojo");
    }

    iconoMenuResponsive.addEventListener("click", toggleMenu);
    iconoCerrar.addEventListener("click", toggleMenu);

    const menuLinks = menuResponsive.querySelectorAll("a");
    menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});  

// función de carrusel promos -------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        speed: 1500,
        slidesPerView: 3, 
        spaceBetween: 10, 
        loop: true, 
        effect: 'slide', 
        autoplay: {
            delay: 4000, 
            disableOnInteraction: false, 
        },
    });
});

// función con SweetAlert2 para los tipos de planes ---------------------------
document.getElementById('moto').addEventListener('click', function() {
    Swal.fire({
        title: 'Elegí un tipo de plan',
        html: `
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <button id="basicPlan" class="swal2-confirm swal2-styled" style="background-color: #80cdd7; color: #fff; margin: 5px;">Básico</button>
                <button id="intermediatePlan" class="swal2-deny swal2-styled" style="background-color: #499da7; color: #fff; margin: 5px;">Intermedio</button>
                <button id="premiumPlan" class="swal2-cancel swal2-styled" style="background-color: #126d77; color: #fff; margin: 5px;">Premium</button>
                <button id="masterPlan" class="swal2-confirm swal2-styled" style="background-color: #003366; color: #fff; margin: 5px;">Master</button>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: false, // Ocultamos el botón por defecto
        icon: 'question',
        background: '#f4f4f4',
        color: '#000',
        iconColor: '#2197a3',
        didOpen: () => {
            // Event listeners para cada botón
            document.getElementById('basicPlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Básico',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: red;">✘ Robo total</strong></p>
                            <p><strong style="color: red;">✘ Robo parcial</strong></p>
                            <p><strong style="color: red;">✘ Incendio total</strong></p>
                            <p><strong style="color: red;">✘ Incendio parcial</strong></p>
                            <p><strong style="color: red;">✘ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: red;">✘ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });

            document.getElementById('intermediatePlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Intermedio',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: green;">✔ Robo total</strong></p>
                            <p><strong style="color: green;">✔ Incendio total</strong></p>
                            <p><strong style="color: green;">✔ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: red;">✘ Robo parcial</strong></p>
                            <p><strong style="color: red;">✘ Incendio parcial</strong></p>
                            <p><strong style="color: red;">✘ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });

            document.getElementById('premiumPlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Premium',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: green;">✔ Robo total</strong></p>
                            <p><strong style="color: green;">✔ Incendio total</strong></p>
                            <p><strong style="color: green;">✔ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: green;">✔ Robo parcial</strong></p>
                            <p><strong style="color: green;">✔ Incendio parcial</strong></p>
                            <p><strong style="color: red;">✘ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });

            document.getElementById('masterPlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Master',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: green;">✔ Robo total</strong></p>
                            <p><strong style="color: green;">✔ Incendio total</strong></p>
                            <p><strong style="color: green;">✔ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: green;">✔ Robo parcial</strong></p>
                            <p><strong style="color: green;">✔ Incendio parcial</strong></p>
                            <p><strong style="color: green;">✔ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });
        }
    });
});

document.getElementById('auto').addEventListener('click', function() {
    Swal.fire({
        title: 'Elegí un tipo de plan',
        html: `
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
                <button id="basicPlan" class="swal2-confirm swal2-styled" style="background-color: #80cdd7; color: #fff; margin: 5px;">Básico</button>
                <button id="intermediatePlan" class="swal2-deny swal2-styled" style="background-color: #499da7; color: #fff; margin: 5px;">Intermedio</button>
                <button id="premiumPlan" class="swal2-cancel swal2-styled" style="background-color: #126d77; color: #fff; margin: 5px;">Premium</button>
                <button id="masterPlan" class="swal2-confirm swal2-styled" style="background-color: #003366; color: #fff; margin: 5px;">Master</button>
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: false, 
        icon: 'question',
        background: '#f4f4f4',
        color: '#000',
        iconColor: '#2197a3',
        didOpen: () => {
            document.getElementById('basicPlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Básico',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: red;">✘ Robo total</strong></p>
                            <p><strong style="color: red;">✘ Robo parcial</strong></p>
                            <p><strong style="color: red;">✘ Incendio total</strong></p>
                            <p><strong style="color: red;">✘ Incendio parcial</strong></p>
                            <p><strong style="color: red;">✘ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: red;">✘ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });

            document.getElementById('intermediatePlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Intermedio',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: green;">✔ Robo total</strong></p>
                            <p><strong style="color: green;">✔ Incendio total</strong></p>
                            <p><strong style="color: green;">✔ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: red;">✘ Robo parcial</strong></p>
                            <p><strong style="color: red;">✘ Incendio parcial</strong></p>
                            <p><strong style="color: red;">✘ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });

            document.getElementById('premiumPlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Premium',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: green;">✔ Robo total</strong></p>
                            <p><strong style="color: green;">✔ Incendio total</strong></p>
                            <p><strong style="color: green;">✔ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: green;">✔ Robo parcial</strong></p>
                            <p><strong style="color: green;">✔ Incendio parcial</strong></p>
                            <p><strong style="color: red;">✘ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });

            document.getElementById('masterPlan').addEventListener('click', () => {
                Swal.fire({
                    title: 'Beneficios del Plan Master',
                    html: `
                        <div style="text-align: left;">
                            <p><strong style="color: green;">✔ Responsabilidad Civil</strong></p>
                            <p><strong style="color: green;">✔ Robo total</strong></p>
                            <p><strong style="color: green;">✔ Incendio total</strong></p>
                            <p><strong style="color: green;">✔ Accidente total o destrucción total</strong></p>
                            <p><strong style="color: green;">✔ Robo parcial</strong></p>
                            <p><strong style="color: green;">✔ Incendio parcial</strong></p>
                            <p><strong style="color: green;">✔ Daño parcial con franquicia</strong></p>
                        </div>
                    `,
                    showCloseButton: true,
                    icon: 'info',
                    iconColor: '#2197a3',
                    confirmButtonColor: '#2197a3',
                    confirmButtonText: 'Cotizar ahora',
                    background: '#f4f4f4',
                    color: '#000',
                    preConfirm: () => {
                        window.location.href = '/solicitante_form';
                    }
                });
            });
        }
    });
});

// función sw preguntas frecuentes --------------------------------------------
document.querySelectorAll('.pregunta').forEach(pregunta => {
  pregunta.addEventListener('click', () => {
      const respuesta = pregunta.nextElementSibling;
      const icono = pregunta.querySelector('i');

      // mostrar/ocultar la respuesta
      if (respuesta.style.display === 'block') {
          respuesta.style.display = 'none';
          icono.classList.remove('fi-rr-angle-small-up');
          icono.classList.add('fi-rr-angle-small-down');
      } else {
          respuesta.style.display = 'block';
          icono.classList.remove('fi-rr-angle-small-down');
          icono.classList.add('fi-rr-angle-small-up');
      }
  });
});

// función para mostrar el modal
    const mostrarModal = () => {
        Swal.fire({
            title: '¿Desea cotizar su vehículo?',
            confirmButtonText: 'Cotizar',
            showCloseButton: true,
            confirmButtonColor: '#2197a3',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/solicitante_form'; 
            }
        });
    };

    const footer = document.querySelector('footer');

    // crear el IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mostrarModal();
                observer.unobserve(entry.target); 
            }
        });
    });

    observer.observe(footer);
