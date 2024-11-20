document.addEventListener('DOMContentLoaded', () => {
    const baseDeDatos = [
        { id: 1, nombre: "Creatina Micronizada", precio: 30, imagen: "img/Creatina.jpg" },
        { id: 2, nombre: "Proteína de Suero", precio: 100, imagen: "img/Proteína.jpg" },
        { id: 3, nombre: "Cafeína en Cápsulas", precio: 15, imagen: "img/Cafeína.jpg" },
        { id: 4, nombre: "Pre-entreno de Alto Rendimiento", precio: 25, imagen: "img/Pre.jpg" },
        { id: 5, nombre: "Vitamina C en Cápsulas", precio: 60, imagen: "img/VitaminaC.jpg" },
        { id: 6, nombre: "L-Carnitina", precio: 80, imagen: "img/LCaritina.jpg" }
    ];

    let carrito = [];
    const DOMitems = document.querySelector("#items");
    const DOMcarritoItems = document.querySelector("#carrito-items");
    const DOMtotalPrecio = document.querySelector("#total-precio");
    const DOMbotonVaciar = document.querySelector("#vaciar-carrito");

    // Renderizar los productos en la tienda
    function renderizarProductos() {
        baseDeDatos.forEach((producto) => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            const imagen = document.createElement("img");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.classList.add("producto-img");

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

            const precio = document.createElement("p");
            precio.textContent = `$${producto.precio} USD`;
            precio.classList.add("precio");

            const boton = document.createElement("button");
            boton.textContent = "Añadir al carrito";
            boton.classList.add("boton", "agregar-carrito");
            boton.dataset.id = producto.id;
            boton.addEventListener("click", agregarProductoAlCarrito);

            productoDiv.appendChild(imagen);
            productoDiv.appendChild(nombre);
            productoDiv.appendChild(precio);
            productoDiv.appendChild(boton);

            DOMitems.appendChild(productoDiv);
        });
    }

    // Agregar producto al carrito
    function agregarProductoAlCarrito(evento) {
        carrito.push(evento.target.dataset.id);
        actualizarCarrito();
    }

    // Renderizar el contenido del carrito
    function renderizarCarrito() {
        DOMcarritoItems.innerHTML = "";
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((id) => {
            const producto = baseDeDatos.find((p) => p.id == id);
            const cantidad = carrito.filter((itemId) => itemId == id).length;

            const item = document.createElement("li");
            item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            item.textContent = `${producto.nombre} - $${producto.precio} USD`;

            // Contenedor para controles de cantidad
            const controlesCantidad = document.createElement("div");

            // Botón de disminuir cantidad
            const botonDisminuir = document.createElement("button");
            botonDisminuir.textContent = "-";
            botonDisminuir.classList.add("btn", "btn-warning", "btn-sm", "mx-1");
            botonDisminuir.dataset.id = id;
            botonDisminuir.addEventListener("click", () => {
                disminuirCantidad(id);
            });

            // Mostrar cantidad actual
            const cantidadSpan = document.createElement("span");
            cantidadSpan.textContent = cantidad;
            cantidadSpan.classList.add("mx-2");

            // Botón de aumentar cantidad
            const botonAumentar = document.createElement("button");
            botonAumentar.textContent = "+";
            botonAumentar.classList.add("btn", "btn-success", "btn-sm", "mx-1");
            botonAumentar.dataset.id = id;
            botonAumentar.addEventListener("click", () => {
                aumentarCantidad(id);
            });

            // Botón de eliminar producto
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.classList.add("btn", "btn-danger", "btn-sm");
            botonEliminar.dataset.id = id;
            botonEliminar.addEventListener("click", eliminarProductoDelCarrito);

            // Añadir botones al contenedor
            controlesCantidad.appendChild(botonDisminuir);
            controlesCantidad.appendChild(cantidadSpan);
            controlesCantidad.appendChild(botonAumentar);

            // Añadir controles y botón eliminar al ítem
            item.appendChild(controlesCantidad);
            item.appendChild(botonEliminar);

            DOMcarritoItems.appendChild(item);
        });

        DOMtotalPrecio.textContent = calcularTotal();
    }

    // Aumentar cantidad de un producto
    function aumentarCantidad(id) {
        carrito.push(id);
        actualizarCarrito();
    }

    // Disminuir cantidad de un producto
    function disminuirCantidad(id) {
        const index = carrito.indexOf(id);
        if (index !== -1) {
            carrito.splice(index, 1);
        }
        actualizarCarrito();
    }

    // Calcular total del carrito
    function calcularTotal() {
        return carrito
            .reduce((total, id) => {
                const producto = baseDeDatos.find((p) => p.id == id);
                return total + producto.precio;
            }, 0)
            .toFixed(2);
    }

    // Eliminar producto del carrito
    function eliminarProductoDelCarrito(evento) {
        const id = evento.target.dataset.id;
        carrito = carrito.filter((itemId) => itemId !== id);
        actualizarCarrito();
    }

    // Vaciar todo el carrito
    function vaciarCarrito() {
        carrito = []; // Limpia el carrito
        actualizarCarrito(); // Refresca el carrito
        localStorage.removeItem("carrito"); // Limpia el localStorage
    }

    // Guardar el carrito en Local Storage
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Cargar el carrito desde Local Storage
    function cargarCarritoDesdeLocalStorage() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
        }
    }

    // Actualizar carrito y guardar en Local Storage
    function actualizarCarrito() {
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    // Función para manejar el pago
    function pagarCarrito() {
        if (carrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de pagar.");
        } else {
            alert("Gracias por su compra. ¡Esperamos verle pronto!");
            vaciarCarrito(); // Vacía el carrito después de pagar
        }
    }

    // Botón de pagar
    const DOMbotonPagar = document.querySelector("#pagar-carrito");
    DOMbotonPagar.addEventListener("click", pagarCarrito);

    // Inicializar la página
    cargarCarritoDesdeLocalStorage();
    renderizarProductos();
    renderizarCarrito();

    // Evento para el botón de vaciar carrito
    DOMbotonVaciar.addEventListener("click", vaciarCarrito);
});
