var productosBase = [
    { id: 1, nombre: "Alimento Premium Perro Adulto", categoria: "Alimento", precio: 15000, img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80" },
    { id: 2, nombre: "Alimento Gato Esterilizado", categoria: "Alimento", precio: 12500, img: "https://images.unsplash.com/photo-1596854331442-3cf47265cefb?w=500&q=80" },
    { id: 3, nombre: "Snacks Naturales Perro", categoria: "Alimento", precio: 4500, img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&q=80" },
    { id: 4, nombre: "Collar Ajustable Mediano", categoria: "Accesorio", precio: 5000, img: "https://plus.unsplash.com/premium_photo-1692392181661-96c4b34759db?w=500&q=80" },
    { id: 5, nombre: "Correa Retráctil 5m", categoria: "Accesorio", precio: 9500, img: "https://images.unsplash.com/photo-1719910448385-66fae551f812?w=500&q=80" },
    { id: 6, nombre: "Cama Antiestrés Talla M", categoria: "Accesorio", precio: 18000, img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=500&q=80" },
    { id: 7, nombre: "Antipulgas y Garrapatas", categoria: "Medicamento", precio: 8000, img: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&q=80" },
    { id: 8, nombre: "Desparasitante Interno", categoria: "Medicamento", precio: 6500, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80" },
    { id: 9, nombre: "Suplemento Vitamínico", categoria: "Medicamento", precio: 11000, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&q=80" }
];

var productosTienda = [];
var carrito = JSON.parse(localStorage.getItem("carritoPetPulse")) || [];
var filtroActual = "todos";

document.addEventListener("DOMContentLoaded", function() {
    obtenerProductosBD();
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

    var btnProcesar = document.getElementById("btnProcesarPedido");
    if (btnProcesar) {
        btnProcesar.addEventListener("click", function() {
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                return;
            }
            guardarCarrito();
            window.location.href = "carrito.html";
        });
    }
});

function obtenerProductosBD() {
    $.ajax({
        url: "app/productos/listar.php",
        type: "GET",
        success: function(res) {
            var productosBD = res.data || res;
            if (Array.isArray(productosBD) && productosBD.length > 0) {
                var formateados = productosBD.map(function(p) {
                    return {
                        id: 'bd_' + p.id,
                        nombre: p.nombre,
                        categoria: p.categoria || "General",
                        precio: Number(p.precio),
                        img: p.imagen ? p.imagen : "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80"
                    };
                });
                productosTienda = formateados.concat(productosBase);
            } else {
                productosTienda = productosBase;
            }
            pintarProductos();
        },
        error: function() {
            productosTienda = productosBase;
            pintarProductos();
        }
    });
}

function pintarProductos() {
    var cont = document.getElementById("contenedorProductos");
    if (!cont) return;
    cont.innerHTML = "";

    for (var i = 0; i < productosTienda.length; i++) {
        var p = productosTienda[i];

        if (filtroActual !== "todos" && p.categoria.toLowerCase() !== filtroActual.toLowerCase()) {
            continue;
        }

        var col = document.createElement("div");
        col.className = "col-sm-6 col-lg-4 mb-4";
        col.innerHTML =
            '<div class="card bg-black text-white border-secondary h-100 shadow-sm">' +
                '<img src="' + p.img + '" class="card-img-top" alt="' + p.nombre + '" style="height: 180px; object-fit: cover;">' +
                '<div class="card-body d-flex flex-column">' +
                    '<span class="badge bg-personalizado-morado align-self-start mb-2">' + p.categoria + '</span>' +
                    '<h6 class="fw-bold mb-1">' + p.nombre + '</h6>' +
                    '<p class="text-secondary fw-bold mb-3">₡' + p.precio.toLocaleString() + '</p>' +
                    '<button class="btn btn-outline-light btn-sm mt-auto" onclick="agregarAlCarrito(\'' + p.id + '\')">' +
                    '<i class="bi bi-cart-plus"></i> Agregar al carrito' +
                    '</button>' +
                '</div>' +
            '</div>';

        cont.appendChild(col);
    }
}

function agregarAlCarrito(id) {
    var producto = productosTienda.find(function(p) { return p.id == id; });
    if (!producto) return;
    
    var existente = carrito.find(function(c) { return c.id == id; });

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    guardarCarrito();
    pintarCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(function(c) { return c.id != id; });
    guardarCarrito();
    pintarCarrito();
}

function cambiarCantidad(id, delta) {
    var item = carrito.find(function(c) { return c.id == id; });
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
    if (!lista) return;

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
                    '<button class="btn btn-sm btn-outline-light py-0 px-2" onclick="cambiarCantidad(\'' + item.id + '\', -1)">-</button>' +
                    '<span>' + item.cantidad + '</span>' +
                    '<button class="btn btn-sm btn-outline-light py-0 px-2" onclick="cambiarCantidad(\'' + item.id + '\', 1)">+</button>' +
                '</div>' +
            '</div>' +
            '<button class="btn btn-sm btn-outline-danger border-0" onclick="quitarDelCarrito(\'' + item.id + '\')"><i class="bi bi-trash3"></i></button>';

        lista.appendChild(fila);
    }

    var impuesto = subtotal * 0.13;
    var total = subtotal + impuesto;

    if (document.getElementById("carritoSubtotal")) document.getElementById("carritoSubtotal").innerText = "₡" + subtotal.toLocaleString();
    if (document.getElementById("carritoImpuesto")) document.getElementById("carritoImpuesto").innerText = "₡" + impuesto.toLocaleString(undefined, {maximumFractionDigits: 0});
    if (document.getElementById("carritoTotal")) document.getElementById("carritoTotal").innerText = "₡" + total.toLocaleString(undefined, {maximumFractionDigits: 0});
    if (badge) badge.innerText = totalItems;
}