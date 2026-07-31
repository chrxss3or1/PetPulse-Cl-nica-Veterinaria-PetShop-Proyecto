document.getElementById("triajeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombreMascota = document.getElementById("nombrePaciente").value.trim();
    var resultadoDiv = document.getElementById("resultadoTriaje");
    var botonContainer = document.getElementById("contenedorBotonCita");

    var checkboxesSeleccionados = document.querySelectorAll(".sintoma-checkbox:checked");
    
    if (checkboxesSeleccionados.length === 0) {
        alert("Por favor, seleccione al menos un síntoma antes de calcular.");
        return;
    }

    var puntajeTotal = 0;
    var tieneSintomaRojo = false;

    checkboxesSeleccionados.forEach(function(checkbox) {
        var valor = parseInt(checkbox.value);
        puntajeTotal += valor;
        if (valor === 3) {
            tieneSintomaRojo = true; 
        }
    });

    if (tieneSintomaRojo || puntajeTotal >= 3) {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-danger shadow";
        resultadoDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill display-4 text-danger mb-2"></i>
            <h4 class="text-danger fw-bold">NIVEL 1: EMERGENCIA CRÍTICA</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> requiere atención médica veterinaria inmediata.</p>
        `;
        
        var triajesRojos = JSON.parse(localStorage.getItem("triajesRojos")) || [];
        triajesRojos.push({
            mascota: nombreMascota || "Paciente sin nombre",
            fecha: new Date().toLocaleString()
        });
        localStorage.setItem("triajesRojos", JSON.stringify(triajesRojos));

    } else if (puntajeTotal === 2) {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-warning shadow";
        resultadoDiv.innerHTML = `
            <i class="bi bi-exclamation-circle-fill display-4 text-warning mb-2"></i>
            <h4 class="text-warning fw-bold">NIVEL 2: URGENCIA MODERADA</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> requiere valoración profesional dentro de las próximas horas.</p>
        `;
    } else {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-success shadow";
        resultadoDiv.innerHTML = `
            <i class="bi bi-check-circle-fill display-4 text-success mb-2"></i>
            <h4 class="text-success fw-bold">NIVEL 3: ATENCIÓN GENERAL</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> puede agendar una consulta externa regular.</p>
        `;
    }

    botonContainer.innerHTML = `
        <a href="citas.html" class="btn btn-personalizado-morado w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow">
            <i class="bi bi-calendar-plus"></i> Ir a la Agenda de Citas
        </a>
    `;
});