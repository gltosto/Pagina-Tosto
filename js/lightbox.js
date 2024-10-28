const imagenes = document.querySelectorAll('.img-galeria');
const imagenesLight = document.querySelector('.agregar-imagen');
const contenedorLight = document.querySelector('.imagen-light');
const hamburger1 = document.querySelector('.hamburger');
const tituloImagen = document.querySelector('.titulo-imagen'); // Selecciona el título
const textoImagen = document.querySelector('.texto-imagen p'); // Selecciona el párrafo

imagenes.forEach((imagen) => {
    imagen.addEventListener('click', () => {
        const titulo = imagen.getAttribute('data-title'); // Título específico
        const texto = imagen.getAttribute('data-text'); // Texto específico
        aparecerImagen(imagen.getAttribute('src'), titulo, texto);
    });
});

contenedorLight.addEventListener('click', (e) => {
    if (e.target !== imagenesLight && e.target !== textoImagen) {
        contenedorLight.classList.toggle('show');
        imagenesLight.classList.toggle('showImage');
        hamburger1.style.opacity = '1';
    }
});

const aparecerImagen = (src, titulo, texto) => {
    imagenesLight.src = src;
    tituloImagen.textContent = titulo;
    textoImagen.textContent = texto;
    contenedorLight.classList.toggle('show');
    imagenesLight.classList.toggle('showImage');
    hamburger1.style.opacity = '0';
};

// Verificar si el contenido del lightbox sobrepasa el alto de la pantalla
function ajustarOverflow() {
    const lightbox = document.querySelector('.imagen-light');
    const contenido = document.querySelector('.contenedor-light');

    // Comparamos el alto total del contenido con el alto del lightbox
    if (contenido.scrollHeight > lightbox.clientHeight) {
        lightbox.style.overflowY = 'auto'; // Habilitar scroll vertical
    } else {
        lightbox.style.overflowY = 'hidden'; // Desactivar scroll
    }
}

// Ejecuta la función al cargar y al redimensionar la ventana
window.addEventListener('load', ajustarOverflow);
window.addEventListener('resize', ajustarOverflow);
