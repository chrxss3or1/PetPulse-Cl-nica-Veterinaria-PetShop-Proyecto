document.addEventListener("DOMContentLoaded", function () {
    cargarMascotasEnSelect();
});

function cargarMascotasEnSelect() {
    $.ajax({
        url: "app/mascotas/listar.php",
        type: "GET",
        dataType: "json",
        success: function (res) {
            var select = $("#nombrePaciente");
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
            if (pacienteParam) {
                select.val(pacienteParam);
            }
        },
        error: function () {
            console.error("Error al cargar la lista de mascotas en el select.");
        }
    });
}

document.getElementById("triajeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var nombreMascota = document.getElementById("nombrePaciente").value;
    if (!nombreMascota) {
        alert("Por favor seleccione una mascota.");
        return;
    }

    var resultadoDiv = document.getElementById("resultadoTriaje");
    var botonContainer = document.getElementById("contenedorBotonCita");

    var checkboxesSeleccionados = document.querySelectorAll(".sintoma-checkbox:checked");
    if (checkboxesSeleccionados.length === 0) {
        alert("Por favor, seleccione al menos un síntoma antes de calcular.");
        return;
    }

    var puntajeTotal = 0;
    var tieneSintomaRojo = false;

    checkboxesSeleccionados.forEach(function (checkbox) {
        var valor = parseInt(checkbox.value);
        puntajeTotal += valor;
        if (valor === 3) tieneSintomaRojo = true;
    });

    var nivelSimple = "Verde";

    if (tieneSintomaRojo || puntajeTotal >= 3) {
        nivelSimple = "Rojo";
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-danger shadow";
        resultadoDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill display-4 text-danger mb-2"></i>
            <h4 class="text-danger fw-bold">NIVEL 1: EMERGENCIA CRÍTICA</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> requiere atención veterinaria inmediata.</p>
        `;

        $.ajax({
            url: "app/triajes/guardar.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ mascota: nombreMascota, nivel: "Rojo", puntaje: puntajeTotal })
        });

    } else if (puntajeTotal === 2) {
        nivelSimple = "Amarillo";
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-warning shadow";
        resultadoDiv.innerHTML = `
            <i class="bi bi-exclamation-circle-fill display-4 text-warning mb-2"></i>
            <h4 class="text-warning fw-bold">NIVEL 2: URGENCIA MODERADA</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> requiere valoración pronta.</p>
        `;
    } else {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-success shadow";
        resultadoDiv.innerHTML = `
            <i class="bi bi-check-circle-fill display-4 text-success mb-2"></i>
            <h4 class="text-success fw-bold">NIVEL 3: ATENCIÓN GENERAL</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> puede agendar consulta regular.</p>
        `;
    }

    if (botonContainer) {
        botonContainer.innerHTML = `
            <a href="citas.html?paciente=${encodeURIComponent(nombreMascota)}&prioridad=${encodeURIComponent(nivelSimple)}" class="btn btn-personalizado-morado w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow mt-3">
                <i class="bi bi-calendar-plus"></i> Ir a la Agenda de Citas
            </a>
        `;
    }
});