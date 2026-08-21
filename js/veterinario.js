$(document).ready(function () {
    mostrarTriajesRojos();
    mostrarRecetas();

    $("#formReceta").submit(function (e) {
        e.preventDefault();
        var recetaData = {
            mascota: $("#mascota").val(),
            diagnostico: $("#diagnostico").val(),
            tratamiento: $("#tratamiento").val(),
            receta: $("#receta").val()
        };

        $.ajax({
            url: "app/recetas/guardar.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(recetaData),
            success: function (res) {
                if (res.success) {
                    alert("Receta registrada en Base de Datos.");
                    mostrarRecetas();
                    $("#formReceta")[0].reset();
                }
            }
        });
    });
});

function mostrarRecetas() {
    $.ajax({
        url: "app/recetas/listar.php",
        type: "GET",
        success: function (res) {
            var tabla = "";
            if (res.data) {
                res.data.forEach(function (r) {
                    tabla += `
                        <tr>
                            <td>${r.mascota}</td>
                            <td>${r.diagnostico}</td>
                            <td>${r.tratamiento}</td>
                            <td>${r.receta}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="eliminarReceta(${r.id})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
            }
            $("#tablaRecetas").html(tabla);
        }
    });
}

function eliminarReceta(id) {
    $.ajax({
        url: "app/recetas/eliminar.php",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ id: id }),
        success: function () { mostrarRecetas(); }
    });
}

function mostrarTriajesRojos() {
    $.ajax({
        url: "app/triajes/listar.php",
        type: "GET",
        success: function (res) {
            var cont = $("#alertaTriajesRojos");
            if (!res.data || res.data.length === 0) {
                cont.html('<div class="alert alert-secondary">No hay triajes rojos pendientes.</div>');
                return;
            }
            var html = '<div class="alert alert-danger"><h5>🚨 Triajes Rojos Activos</h5><ul class="mb-0">';
            res.data.forEach(function (t) {
                html += `<li><strong>${t.mascota}</strong> - Registrado el ${t.fecha}</li>`;
            });
            html += '</ul></div>';
            cont.html(html);
        }
    });
}