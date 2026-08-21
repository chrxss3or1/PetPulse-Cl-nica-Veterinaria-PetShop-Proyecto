
$(document).ready(function () {
    cargarProductosAdmin();
    cargarUsuariosAdmin();

    $("#formProducto").submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("nombre", $("#nombre").val());
        formData.append("categoria", $("#categoria").val());
        formData.append("precio", $("#precio").val());
        formData.append("stock", $("#stock").val());

        var fileInput = $("#imagenProducto")[0];
        if (fileInput && fileInput.files.length > 0) {
            formData.append("imagen", fileInput.files[0]);
        }

        $.ajax({
            url: "app/productos/guardar.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (res) {
                if (res.success || res.status === "ok") {
                    alert("Producto agregado exitosamente.");
                    $("#formProducto")[0].reset();
                    cargarProductosAdmin();
                } else {
                    alert(res.message || "No se pudo guardar el producto.");
                }
            },
            error: function () {
                alert("Error al comunicarse con el servidor.");
            }
        });
    });
});

function cargarProductosAdmin() {
    $.ajax({
        url: "app/productos/listar.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
            var tabla = "";
            var stockTotal = 0;
            var listado = res.data || res;

            if (Array.isArray(listado)) {
                listado.forEach(function (p) {
                    stockTotal += parseInt(p.stock || 0);
                    var imgHtml = p.imagen 
                        ? `<img src="${p.imagen}" style="width:38px; height:38px; object-fit:cover;" class="rounded me-2">`
                        : `<i class="bi bi-box-seam me-2 text-secondary"></i>`;

                    tabla += `
                        <tr>
                            <td>${imgHtml} ${p.nombre}</td>
                            <td>${p.categoria || 'General'}</td>
                            <td>₡${parseFloat(p.precio).toLocaleString()}</td>
                            <td>${p.stock}</td>
                            <td>
                                <button class="btn btn-outline-danger btn-sm" onclick="eliminarProductoAdmin(${p.id})">
                                    <i class="bi bi-trash"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });
            }

            $("#tablaProductos").html(tabla);
            $("#totalProductos").text(Array.isArray(listado) ? listado.length : 0);
            $("#stockTotal").text(stockTotal);
        }
    });
}

function eliminarProductoAdmin(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        $.ajax({
            url: "app/productos/eliminar.php",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ id: id }),
            success: function () {
                cargarProductosAdmin();
            }
        });
    }
}

// ---- GESTIÓN DE USUARIOS ----

function cargarUsuariosAdmin() {
    $.ajax({
        url: "app/usuarios/listar.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
            var listado = res.data || res;
            if (!Array.isArray(listado)) return;

            var tabla = "";
            listado.forEach(function (u) {
                var esActivo = u.estado === 'Activo' || u.estado == 1;
                var badgeClass = esActivo ? 'bg-success' : 'bg-secondary';
                var estadoTexto = esActivo ? 'Activo' : 'Inactivo';

                tabla += `
                    <tr>
                        <td><strong>${u.nombre}</strong><br><small class="text-secondary">${u.email}</small></td>
                        <td><span class="text-capitalize">${u.rol}</span></td>
                        <td><span class="badge ${badgeClass}">${estadoTexto}</span></td>
                        <td>
                            <button class="btn btn-outline-warning btn-sm me-1" onclick="cambiarEstadoUsuario(${u.id}, '${estadoTexto}')">
                                Cambiar Estado
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="eliminarUsuarioAdmin(${u.id})">
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            });

            $("#tablaUsuarios").html(tabla);
            $("#totalUsuarios").text(listado.length);
        }
    });
}

function cambiarEstadoUsuario(id, estadoActual) {
    var nuevoEstado = (estadoActual === 'Activo') ? 'Inactivo' : 'Activo';

    $.ajax({
        url: "app/usuarios/cambiar_estado.php",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({ id: id, estado: nuevoEstado }),
        success: function (res) {
            if (res.success || res.status === "ok") {
                cargarUsuariosAdmin();
            } else {
                alert(res.message || "Error al actualizar el estado.");
            }
        }
    });
}

function eliminarUsuarioAdmin(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario del sistema?")) {
        $.ajax({
            url: "app/usuarios/eliminar.php",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ id: id }),
            success: function (res) {
                if (res.success || res.status === "ok") {
                    cargarUsuariosAdmin();
                } else {
                    alert(res.message || "No se pudo eliminar el usuario.");
                }
            }
        });
    }
}