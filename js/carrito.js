let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

mostrarCarrito();


function mostrarCarrito(){

    let contenedor = document.getElementById("listaCarrito");

    contenedor.innerHTML = "";

    if(carrito.length === 0){

        contenedor.innerHTML = `
        <div class="alert alert-warning">
            El carrito está vacío
        </div>
        `;

        return;
    }


    let total = 0;


    carrito.forEach(function(producto,index){

        total += producto.precio;


        contenedor.innerHTML += `

        <div class="card bg-personalizado-gris text-white mb-3">

            <div class="card-body d-flex justify-content-between align-items-center">

                <div>
                    <h5>${producto.nombre}</h5>
                    <p class="text-secondary">
                    ${producto.categoria}
                    </p>
                </div>


                <div>

                    <h5 class="text-success">
                    ₡${producto.precio}
                    </h5>


                    <button class="btn btn-danger"
                    onclick="eliminar(${index})">
                    Eliminar
                    </button>

                </div>


            </div>

        </div>

        `;


    });


    document.getElementById("total").innerHTML = 
    "Total: ₡" + total;


}



function eliminar(index){

    carrito.splice(index,1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();

}