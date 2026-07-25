document.getElementById("triajeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombreMascota = document.getElementById("nombrePaciente").value.trim();
    var resultadoDiv = document.getElementById("resultadoTriaje");
    var botonContainer = document.getElementById("contenedorBotonCita");

    var puntajeTotal = 0;
    var idsSintomas = ["sintomaGrave1", "sintomaGrave2", "sintomaMedio1", "sintomaMedio2", "sintomaLeve1"];

    for (var i = 0; i < idsSintomas.length; i++) {
        var checkbox = document.getElementById(idsSintomas[i]);
        if (checkbox && checkbox.checked) {
            puntajeTotal += parseInt(checkbox.value);
        }
    }

    if (puntajeTotal >= 3) {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-danger";
        resultadoDiv.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill display-4 text-danger mb-2"></i>
            <h4 class="text-danger fw-bold">NIVEL 1: EMERGENCIA CRÍTICA</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> requiere atención inmediata.</p>
        `;
        var triajesRojos = JSON.parse(localStorage.getItem("triajesRojos")) || [];
        triajesRojos.push({
            mascota: nombreMascota || "Paciente sin nombre",
            fecha: new Date().toLocaleString()
        });
        localStorage.setItem("triajesRojos", JSON.stringify(triajesRojos));
    } else if (puntajeTotal === 2) {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-warning";
        resultadoDiv.innerHTML = `
            <i class="bi bi-exclamation-circle-fill display-4 text-warning mb-2"></i>
            <h4 class="text-warning fw-bold">NIVEL 2: URGENCIA MODERADA</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> requiere valoración dentro de la próxima hora.</p>
        `;
    } else {
        resultadoDiv.className = "p-4 rounded-4 text-center my-4 bg-dark border border-success";
        resultadoDiv.innerHTML = `
            <i class="bi bi-check-circle-fill display-4 text-success mb-2"></i>
            <h4 class="text-success fw-bold">NIVEL 3: ATENCIÓN GENERAL</h4>
            <p class="text-light mb-0">El paciente <strong>${nombreMascota}</strong> puede esperar consulta externa regular.</p>
        `;
    }

    botonContainer.innerHTML = `
        <a href="citas.html" class="btn btn-personalizado-morado w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow">
            <i class="bi bi-calendar-plus"></i> Ir a la Agenda de Citas
        </a>
    `;
});