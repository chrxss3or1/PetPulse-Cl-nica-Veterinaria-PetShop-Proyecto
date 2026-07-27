var productosTienda = [
    { id: 1, nombre: "Alimento Premium Perro Adulto", categoria: "Alimento", precio: 15000, img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80" },
    { id: 2, nombre: "Alimento Gato Esterilizado", categoria: "Alimento", precio: 12500, img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80" },
    { id: 3, nombre: "Snacks Naturales Perro", categoria: "Alimento", precio: 4500, img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&q=80" },
    { id: 4, nombre: "Collar Ajustable Mediano", categoria: "Accesorio", precio: 5000, img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80" },
    { id: 5, nombre: "Correa Retráctil 5m", categoria: "Accesorio", precio: 9500, img: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=500&q=80" },
    { id: 6, nombre: "Cama Antiestrés Talla M", categoria: "Accesorio", precio: 18000, img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&q=80" },
    { id: 7, nombre: "Antipulgas y Garrapatas", categoria: "Medicamento", precio: 8000, img: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&q=80" },
    { id: 8, nombre: "Desparasitante Interno", categoria: "Medicamento", precio: 6500, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80" },
    { id: 9, nombre: "Suplemento Vitamínico", categoria: "Medicamento", precio: 11000, img: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&q=80" }
];

var carrito = JSON.parse(localStorage.getItem("carritoPetPulse")) || [];
var filtroActual = "todos";

document.addEventListener("DOMContentLoaded", function() {

    pintarProductos();
    pintarCarrito();

    var botonesFiltro = document.querySelectorAll(".filtro-btn");
    for (var i = 0; i < botonesFiltro.length; i++) {
        botonesFiltro[i].addEventListener("click", function() {
            for (var j = 0; j < botonesFiltro.length; j++) {
                botonesFiltro[j].classList.remove("active");
            }
            this.classList.add("active");
            filtroActual = this.getAttribute("data-cat");
            pintarProductos();
        });
    }

    // Al hacer clic en Procesar Pedido, guardamos y redirigimos a carrito.html
    document.getElementById("btnProcesarPedido").addEventListener("click", function() {
        if (carrito.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        guardarCarrito();
        window.location.href = "carrito.html";
    });

});

function pintarProductos() {
    var cont = document.getElementById("contenedorProductos");
    cont.innerHTML = "";

    for (var i = 0; i < productosTienda.length; i++) {
        var p = productosTienda[i];

        if (filtroActual !== "todos" && p.categoria !== filtroActual) {
            continue;
        }

        var col = document.createElement("div");
        col.className = "col-sm-6 col-lg-4";
        col.innerHTML =
            '<div class="card bg-black text-white border-secondary h-100 shadow-sm">' +
                '<img src="' + p.img + '" class="card-img-top" alt="' + p.nombre + '" style="height: 180px; object-fit: cover;">' +
                '<div class="card-body d-flex flex-column">' +
                    '<span class="badge bg-personalizado-morado align-self-start mb-2">' + p.categoria + '</span>' +
                    '<h6 class="fw-bold mb-1">' + p.nombre + '</h6>' +
                    '<p class="text-secondary fw-bold mb-3">₡' + p.precio.toLocaleString() + '</p>' +
                    '<button class="btn btn-outline-light btn-sm mt-auto" onclick="agregarAlCarrito(' + p.id + ')">' +
                        '<i class="bi bi-cart-plus"></i> Agregar al carrito' +
                    '</button>' +
                '</div>' +
            '</div>';

        cont.appendChild(col);
    }
}

function agregarAlCarrito(id) {
    var producto = productosTienda.find(function(p) { return p.id === id; });
    var existente = carrito.find(function(c) { return c.id === id; });

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    guardarCarrito();
    pintarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(function(c) { return c.id !== id; });
    guardarCarrito();
    pintarCarrito();
}

function cambiarCantidad(id, delta) {
    var item = carrito.find(function(c) { return c.id === id; });
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        quitarDelCarrito(id);
        return;
    }

    guardarCarrito();
    pintarCarrito();
}

function guardarCarrito() {
    localStorage.setItem("carritoPetPulse", JSON.stringify(carrito));
}

function pintarCarrito() {
    var lista = document.getElementById("listaCarrito");
    var badge = document.getElementById("badgeCarrito");

    lista.innerHTML = "";

    var totalItems = 0;
    var subtotal = 0;

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-secondary text-center mt-4">Tu carrito está vacío.</p>';
    }

    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        totalItems += item.cantidad;
        subtotal += item.precio * item.cantidad;

        var fila = document.createElement("div");
        fila.className = "d-flex justify-content-between align-items-center border-bottom border-secondary py-2";
        fila.innerHTML =
            '<div>' +
                '<p class="mb-0 small fw-semibold">' + item.nombre + '</p>' +
                '<p class="mb-0 small text-secondary">₡' + item.precio.toLocaleString() + ' c/u</p>' +
                '<div class="d-flex align-items-center gap-2 mt-1">' +
                    '<button class="btn btn-sm btn-outline-light py-0 px-2" onclick="cambiarCantidad(' + item.id + ', -1)">-</button>' +
                    '<span>' + item.cantidad + '</span>' +
                    '<button class="btn btn-sm btn-outline-light py-0 px-2" onclick="cambiarCantidad(' + item.id + ', 1)">+</button>' +
                '</div>' +
            '</div>' +
            '<button class="btn btn-sm btn-outline-danger border-0" onclick="quitarDelCarrito(' + item.id + ')"><i class="bi bi-trash3"></i></button>';

        lista.appendChild(fila);
    }

    var impuesto = subtotal * 0.13;
    var total = subtotal + impuesto;

    document.getElementById("carritoSubtotal").innerText = "₡" + subtotal.toLocaleString();
    document.getElementById("carritoImpuesto").innerText = "₡" + impuesto.toLocaleString(undefined, {maximumFractionDigits: 0});
    document.getElementById("carritoTotal").innerText = "₡" + total.toLocaleString(undefined, {maximumFractionDigits: 0});
    badge.innerText = totalItems;
}