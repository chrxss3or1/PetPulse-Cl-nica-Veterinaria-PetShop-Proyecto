mostrarTriajesRojos();
var recetas = JSON.parse(localStorage.getItem("recetas")) || [];


$(document).ready(function(){


    mostrarRecetas();



    $("#formReceta").submit(function(e){


        e.preventDefault();



        var receta = {


            mascota: $("#mascota").val(),

            diagnostico: $("#diagnostico").val(),

            tratamiento: $("#tratamiento").val(),

            receta: $("#receta").val()


        };



        recetas.push(receta);



        localStorage.setItem("recetas", JSON.stringify(recetas));



        mostrarRecetas();



        $("#formReceta")[0].reset();



        alert("Receta registrada");


    });


});





function mostrarRecetas(){


    var tabla = "";



    recetas.forEach(function(r,index){



        tabla +=

        "<tr>" +

        "<td>"+r.mascota+"</td>" +

        "<td>"+r.diagnostico+"</td>" +

        "<td>"+r.tratamiento+"</td>" +

        "<td>"+r.receta+"</td>" +

        "<td>" +

        "<button class='btn btn-danger btn-sm' onclick='eliminarReceta("+index+")'>" +

        "Eliminar" +

        "</button>" +

        "</td>" +

        "</tr>";



    });



    $("#tablaRecetas").html(tabla);



}





function eliminarReceta(index){



    recetas.splice(index,1);



    localStorage.setItem("recetas", JSON.stringify(recetas));



    mostrarRecetas();



}
function mostrarTriajesRojos(){

    var triajesRojos = JSON.parse(localStorage.getItem("triajesRojos")) || [];
    var cont = document.getElementById("alertaTriajesRojos");

    if(triajesRojos.length === 0){
        cont.innerHTML = '<div class="alert alert-secondary">No hay triajes rojos pendientes.</div>';
        return;
    }

    var html = '<div class="alert alert-danger"><h5>🚨 Triajes Rojos</h5><ul class="mb-0">';

    triajesRojos.forEach(function(t){
        html += '<li>' + t.mascota + ' - ' + t.fecha + '</li>';
    });

    html += '</ul></div>';

    cont.innerHTML = html;

}