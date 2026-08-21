$(document).ready(function () {
    cargarMascotasEnSelect();

    cargarCitas();

    $("#citaForm").submit(function (e) {
        e.preventDefault();

        var paciente = $("#citaMascota").val();
        var especialista = $("#citaVeterinario").val();
        var fecha = $("#citaFecha").val();
        var hora = $("#citaHora").val();
        var prioridad = $("#citaPrioridad").val() || "Verde";

        if (!paciente) {
            alert("Por favor seleccione un paciente.");
            return;
        }

        var citaData = {
            paciente: paciente,
            especialista: especialista,
            fecha: fecha,
            hora: hora,
            prioridad: prioridad
        };

        $.ajax({
            url: "app/citas/guardar.php",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(citaData),
            success: function (res) {
                if (res.success || res.status === "ok") {
                    alert("Cita agendada exitosamente.");
                    $("#citaForm")[0].reset();
                    $("#citaPrioridad").val("Verde");
                    cargarCitas();
                } else {
                    alert(res.message || "Error al agendar la cita.");
                }
            },
            error: function () {
                alert("Ocurrió un error al conectar con el servidor.");
            }
        });
    });
});

function cargarMascotasEnSelect() {
    $.ajax({
        url: "app/mascotas/listar.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
            var select = $("#citaMascota");
            select.empty();
            select.append('<option value="" disabled selected>Seleccione una mascota...</option>');

            var lista = res.data || res;

            if (lista && lista.length > 0) {
                lista.forEach(function (m) {
                    select.append(`<option value="${m.nombre}">${m.nombre} (${m.especie})</option>`);
                });
            }

            var urlParams = new URLSearchParams(window.location.search);
            var pacienteParam = urlParams.get('paciente') || urlParams.get('mascota');
            var prioridadParam = urlParams.get('prioridad');

            if (pacienteParam) {
                select.val(pacienteParam);
            }
            if (prioridadParam) {
                $("#citaPrioridad").val(prioridadParam);
            }
        },
        error: function () {
            console.error("Error al obtener la lista de mascotas para el select.");
        }
    });
}

function cargarCitas() {
    $.ajax({
        url: "app/citas/listar.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
            var tbody = $("#tablaCitasBody");
            tbody.empty();

            var listado = res.data || res;

            if (!Array.isArray(listado) || listado.length === 0) {
                $("#tablaVaciaMensaje").show();
                $("#contadorCitas").text("0 Citas Registradas");
                return;
            }

            $("#tablaVaciaMensaje").hide();
            $("#contadorCitas").text(listado.length + " Citas Registradas");

            listado.forEach(function (cita) {
                var nombrePaciente = cita.mascota_nombre || cita.paciente || "Sin nombre";
                var medico = cita.servicio || cita.especialista || "General";
                var prio = cita.prioridad || "Verde";

                var badge = "bg-success";
                if (prio.toUpperCase().includes("ROJO") || prio.toUpperCase().includes("CRÍTICA") || prio.toUpperCase().includes("ALTA")) {
                    badge = "bg-danger";
                } else if (prio.toUpperCase().includes("AMARILLO") || prio.toUpperCase().includes("MODERADA") || prio.toUpperCase().includes("MEDIA")) {
                    badge = "bg-warning text-dark";
                }

                tbody.append(`
                    <tr class="border-bottom border-personalizado-gris text-light">
                        <td class="fw-bold">${nombrePaciente}</td>
                        <td class="small text-secondary">${medico}</td>
                        <td>${cita.fecha} - ${cita.hora}</td>
                        <td><span class="badge ${badge}">${prio}</span></td>
                        <td>
                            <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarCita(${cita.id})">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function () {
            $("#tablaVaciaMensaje").show();
        }
    });
}

function eliminarCita(id) {
    if (confirm("¿Desea cancelar esta cita médica?")) {
        $.ajax({
            url: "app/citas/eliminar.php",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ id: id }),
            success: function () {
                cargarCitas();
            }
        });
    }
}