var carritoPago = JSON.parse(localStorage.getItem("carritoPetPulse")) || [];
var metodoSeleccionado = 'tarjeta';

document.addEventListener("DOMContentLoaded", function () {
    renderizarResumen();

    document.getElementById("formCheckout").addEventListener("submit", function (e) {
        e.preventDefault();

        if (carritoPago.length === 0) {
            alert("No hay ningún pedido activo para procesar.");
            return;
        }

        alert("¡Pago realizado con éxito mediante " + metodoSeleccionado.toUpperCase() + "! Tu pedido ya está en camino.");
        
        // Limpiamos el carrito en localStorage y regresamos a la tienda
        localStorage.removeItem("carritoPetPulse");
        window.location.href = "Tienda.html";
    });
});

function renderizarResumen() {
    var contenedor = document.getElementById("resumenListaProductos");
    var subtotalEl = document.getElementById("resumenSubtotal");
    var impuestoEl = document.getElementById("resumenImpuesto");
    var totalEl = document.getElementById("resumenTotal");

    contenedor.innerHTML = "";

    if (carritoPago.length === 0) {
        contenedor.innerHTML = '<p class="text-secondary text-center">El carrito está vacío.</p>';
        subtotalEl.innerText = "₡0";
        impuestoEl.innerText = "₡0";
        totalEl.innerText = "₡0";
        return;
    }

    var subtotal = 0;

    for (var i = 0; i < carritoPago.length; i++) {
        var prod = carritoPago[i];
        var totalProducto = prod.precio * prod.cantidad;
        subtotal += totalProducto;

        var div = document.createElement("div");
        div.className = "d-flex justify-content-between align-items-center mb-2";
        div.innerHTML = 
            '<div>' +
                '<h6 class="mb-0 small fw-bold">' + prod.nombre + '</h6>' +
                '<small class="text-secondary">' + prod.cantidad + ' x ₡' + prod.precio.toLocaleString() + '</small>' +
            '</div>' +
            '<span class="fw-bold small">₡' + totalProducto.toLocaleString() + '</span>';

        contenedor.appendChild(div);
    }

    var impuesto = subtotal * 0.13;
    var total = subtotal + impuesto;

    subtotalEl.innerText = "₡" + subtotal.toLocaleString();
    impuestoEl.innerText = "₡" + impuesto.toLocaleString(undefined, { maximumFractionDigits: 0 });
    totalEl.innerText = "₡" + total.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function seleccionarMetodo(metodo, elemento) {
    metodoSeleccionado = metodo;

    var cards = document.querySelectorAll(".metodo-pago-card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.remove("active");
    }
    elemento.classList.add("active");

    var panelTarjeta = document.getElementById("panelTarjeta");
    var panelExpress = document.getElementById("panelExpress");
    var textoExpress = document.getElementById("textoExpress");

    var inputsTarjeta = panelTarjeta.querySelectorAll("input");

    if (metodo === 'tarjeta') {
        panelTarjeta.classList.remove("d-none");
        panelExpress.classList.add("d-none");
        for (var j = 0; j < inputsTarjeta.length; j++) {
            inputsTarjeta[j].required = true;
        }
    } else {
        panelTarjeta.classList.add("d-none");
        panelExpress.classList.remove("d-none");
        for (var k = 0; k < inputsTarjeta.length; k++) {
            inputsTarjeta[k].required = false;
        }

        if (metodo === 'paypal') {
            textoExpress.innerText = "Serás redirigido a PayPal para autenticar y completar tu pago seguro.";
        } else if (metodo === 'gpay') {
            textoExpress.innerText = "Se abrirá la ventana emergente de Google Pay para autorizar el cargo.";
        } else if (metodo === 'applepay') {
            textoExpress.innerText = "Usa Touch ID / Face ID en tu dispositivo Apple para confirmar el pago.";
        }
    }
}