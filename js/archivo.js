function mostrarAlerta(event, mensaje) {
    event.preventDefault(); // Evita que la página se recargue o salte al inicio
    alert(mensaje); // Muestra la alerta con el mensaje recibido
}
