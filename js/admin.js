
var productos = JSON.parse(localStorage.getItem("productos")) || [

    {
        nombre:"Alimento Premium",
        categoria:"Alimento",
        precio:15000,
        stock:20
    },

    {
        nombre:"Collar para perro",
        categoria:"Accesorio",
        precio:5000,
        stock:15
    },

    {
        nombre:"Medicamento Pulgas",
        categoria:"Medicamento",
        precio:8000,
        stock:10
    }

];



$(document).ready(function(){


    guardarProductos();


    cargarProductos();



    $("#formProducto").submit(function(e){

        e.preventDefault();


        var producto = {

            nombre: $("#nombre").val(),

            categoria: $("#categoria").val(),

            precio: Number($("#precio").val()),

            stock: Number($("#stock").val())

        };


        productos.push(producto);


        guardarProductos();


        cargarProductos();


        $("#formProducto")[0].reset();


        alert("Producto agregado correctamente");


    });


});



function guardarProductos(){

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}



function cargarProductos(){


    var tabla = "";

    var stock = 0;



    productos.forEach(function(p,index){


        stock = stock + p.stock;



        tabla +=

        "<tr>" +

            "<td>" + p.nombre + "</td>" +

            "<td>" + p.categoria + "</td>" +

            "<td>₡" + p.precio + "</td>" +

            "<td>" + p.stock + "</td>" +

            "<td>" +

            "<button class='btn btn-danger btn-sm' onclick='eliminarProducto(" + index + ")'>" +

            "Eliminar" +

            "</button>" +

            "</td>" +

        "</tr>";



    });



    $("#tablaProductos").html(tabla);



    $("#totalProductos").text(productos.length);


    $("#stockTotal").text(stock);


}



function eliminarProducto(index){


    productos.splice(index,1);


    guardarProductos();


    cargarProductos();


}



function cambiarEstado(id){


    var estado = document.getElementById(id);



    if(estado.innerHTML == "Activo"){

        estado.innerHTML = "Inactivo";
        estado.className = "badge bg-secondary";

    }

    else{

        estado.innerHTML = "Activo";
        estado.className = "badge bg-success";

    }


}