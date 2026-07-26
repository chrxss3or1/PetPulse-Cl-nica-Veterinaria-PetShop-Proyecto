const productos = [

    {
        id: 1,
        nombre: "Royal Canin",
        categoria: "Alimento",
        precio: 15000
    },

    {
        id: 2,
        nombre: "Dog Chow",
        categoria: "Alimento",
        precio: 12000
    },

    {
        id: 3,
        nombre: "Collar Premium",
        categoria: "Accesorio",
        precio: 7000
    },

    {
        id: 4,
        nombre: "Correa",
        categoria: "Accesorio",
        precio: 9000
    },

    {
        id: 5,
        nombre: "Pelota",
        categoria: "Juguete",
        precio: 3500
    },

    {
        id: 6,
        nombre: "Hueso",
        categoria: "Juguete",
        precio: 2500
    },

    {
        id: 7,
        nombre: "Antipulgas",
        categoria: "Medicamento",
        precio: 8000
    },

    {
        id: 8,
        nombre: "Vitaminas",
        categoria: "Medicamento",
        precio: 6000
    }

];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
mostrarProductos(productos);

actualizarCantidad();

document.getElementById("buscar").addEventListener("keyup", filtrar);

document.getElementById("categoria").addEventListener("change", filtrar);
function filtrar() {

    let texto = document.getElementById("buscar").value.toLowerCase();

    let categoria = document.getElementById("categoria").value;

    let resultado = productos.filter(function (p) {

        let cumpleNombre = p.nombre.toLowerCase().includes(texto);

        let cumpleCategoria = (categoria == "Todos" || p.categoria == categoria);

        return cumpleNombre && cumpleCategoria;

    });
    mostrarProductos(resultado);

}

function mostrarProductos(lista) {

    let contenedor = document.getElementById("listaProductos");

    contenedor.innerHTML = "";

    lista.forEach(function (producto) {

        contenedor.innerHTML += `

<div class="col-md-3">

<div class="card bg-personalizado-gris text-white h-100 border border-secondary">

<div class="card-body text-center">

<i class="bi bi-bag-heart-fill text-personalizado-morado display-3 mb-3"></i>

<h5>${producto.nombre}</h5>

<p class="text-secondary">

${producto.categoria}

</p>

<h4 class="text-success">

₡${producto.precio}

</h4>

<button

class="btn btn-personalizado-morado"

onclick="agregar(${producto.id})">

Agregar al carrito

</button>

</div>

</div>

</div>

`;

    });

}

function agregar(id) {

    let producto = productos.find(p => p.id == id);

    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarCantidad();

    alert(producto.nombre + " agregado al carrito");

}

function actualizarCantidad() {

    document.getElementById("cantidadCarrito").innerHTML = carrito.length;

}