$(document).ready(function () {
    cargarMascotas();

    $("#mascotaForm").submit(function (e) {
        e.preventDefault();

        var id = $("#idMascota").val();
        var nombre = $("#nombreMascota").val().trim();
        var especie = $("#especieMascota").val();
        var edad = $("#edadMascota").val().trim();
        var inputFoto = $("#fotoMascota")[0];

        // Validacion previa en cliente
        if (nombre === "" || especie === "") {
            alert("Por favor ingrese el nombre y la especie.");
            return;
        }

        if (id) {
            $.ajax({
                url: "app/mascotas/actualizar.php",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    id: id,
                    nombre: nombre,
                    especie: especie,
                    edad: edad
                }),
                success: function (res) {
                    if (res.success) {
                        alert(res.message);
                        limpiarFormulario();
                        cargarMascotas();
                    } else {
                        alert(res.message);
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON ? xhr.responseJSON.message : "Error al actualizar.");
                }
            });
        } else {
            var formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("especie", especie);
            formData.append("edad", edad);

            if (inputFoto && inputFoto.files.length > 0) {
                formData.append("foto", inputFoto.files[0]);
            }

            $.ajax({
                url: "app/mascotas/guardar.php",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.success) {
                        alert(res.message);
                        limpiarFormulario();
                        cargarMascotas();
                    } else {
                        alert(res.message);
                    }
                },
                error: function (xhr) {
                    alert(xhr.responseJSON ? xhr.responseJSON.message : "Error al guardar.");
                }
            });
        }
    });
});

function limpiarFormulario() {
    $("#mascotaForm")[0].reset();
    $("#idMascota").val("");
    $("#formTitulo").text("Registrar Paciente");
}

function cargarMascotas() {
    $.ajax({
        url: "app/mascotas/listar.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
            var contenedor = $("#contenedorMascotas");
            contenedor.empty();

            var lista = res.data || res;

            if (!lista || lista.length === 0) {
                contenedor.html('<p class="text-secondary ps-3">No hay mascotas registradas.</p>');
                return;
            }

            lista.forEach(function (m) {
                var imagenUrl = (m.foto && m.foto.trim() !== '') ? m.foto : 'https://placehold.co/400x200/222/FFF?text=Sin+Foto';

                contenedor.append(`
                    <div class="col">
                        <div class="card bg-black text-white border-secondary h-100 shadow-sm overflow-hidden">
                            <img src="${imagenUrl}" class="card-img-top" alt="${m.nombre}" style="height: 180px; object-fit: cover;" onerror="this.onerror=null; this.src='https://placehold.co/400x200/222/FFF?text=Sin+Foto';">
                            <div class="card-body">
                                <h5 class="card-title fw-bold text-personalizado-morado mb-1">${m.nombre}</h5>
                                <p class="card-text mb-1 text-secondary small"><strong>Especie:</strong> ${m.especie}</p>
                                <p class="card-text mb-3 text-secondary small"><strong>Edad:</strong> ${m.edad} años</p>
                                <div class="d-flex gap-2 mb-2">
                                    <button class="btn btn-sm btn-outline-info w-50 fw-bold" onclick="prepararEdicion(${m.id}, '${m.nombre}', '${m.especie}', ${m.edad})">
                                        ✏️ Editar
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger w-50 fw-bold" onclick="eliminarMascota(${m.id})">
                                        🗑️ Eliminar
                                    </button>
                                </div>
                                <a href="triaje.html?paciente=${encodeURIComponent(m.nombre)}" class="btn btn-outline-warning btn-sm w-100 fw-bold">
                                    🩺 Triaje Urgencia
                                </a>
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    });
}

function prepararEdicion(id, nombre, especie, edad) {
    $("#idMascota").val(id);
    $("#nombreMascota").val(nombre);
    $("#especieMascota").val(especie);
    $("#edadMascota").val(edad);
    $("#formTitulo").text("Editar Paciente");
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function eliminarMascota(id) {
    if (confirm("¿Deseas eliminar la mascota de la base de datos?")) {
        $.ajax({
            url: "app/mascotas/eliminar.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ id: id }),
            success: function (res) {
                if (res.success) {
                    cargarMascotas();
                } else {
                    alert(res.message);
                }
            }
        });
    }
}