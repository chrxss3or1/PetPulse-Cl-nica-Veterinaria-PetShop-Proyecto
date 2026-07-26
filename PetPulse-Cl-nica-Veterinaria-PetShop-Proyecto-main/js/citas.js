var listaCitas = [];

document.addEventListener("DOMContentLoaded", function() {
    var inputPrioridad = document.getElementById("citaPrioridad");
    
    if (inputPrioridad) {
        inputPrioridad.value = "GENERAL (Verde)";
        inputPrioridad.className = "form-control input-personalizado-oscuro fw-bold text-center text-success border-success";
    }

    actualizarTablaCitas();
});

document.getElementById("citaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var paciente = document.getElementById("citaMascota").value.trim();
    var especialista = document.getElementById("citaVeterinario").value;
    var fecha = document.getElementById("citaFecha").value;
    var hora = document.getElementById("citaHora").value;
    var prioridad = document.getElementById("citaPrioridad").value;

    var nuevaCita = {
        paciente: paciente,
        especialista: especialista,
        fecha: fecha,
        hora: hora,
        prioridad: prioridad
    };

    listaCitas.push(nuevaCita);

    document.getElementById("citaForm").reset();
    document.getElementById("citaPrioridad").value = "GENERAL (Verde)";
    document.getElementById("citaPrioridad").className = "form-control input-personalizado-oscuro fw-bold text-center text-success border-success";

    actualizarTablaCitas();
    alert("¡Cita agendada con éxito para " + paciente + "!");
});

function actualizarTablaCitas() {
    var tbody = document.getElementById("tablaCitasBody");
    var mensajeVacio = document.getElementById("tablaVaciaMensaje");
    var contadorBadge = document.getElementById("contadorCitas");

    tbody.innerHTML = ""; 

    if (listaCitas.length === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }

    contadorBadge.innerText = listaCitas.length + " Citas Registradas";

    for (var i = 0; i < listaCitas.length; i++) {
        var cita = listaCitas[i];
        
        var badgeColor = "bg-success";
        if (cita.prioridad.indexOf("CRÍTICA") !== -1) {
            badgeColor = "bg-danger";
        } else if (cita.prioridad.indexOf("MODERADA") !== -1) {
            badgeColor = "bg-warning text-dark";
        }

        var fila = document.createElement("tr");
        fila.className = "border-bottom border-personalizado-gris text-light";
        
        fila.innerHTML = `
            <td class="fw-bold">${cita.paciente}</td>
            <td class="small text-secondary">${cita.especialista}</td>
            <td>
                <span class="d-block small fw-semibold">${cita.fecha}</span>
                <span class="text-muted small">${cita.hora}</span>
            </td>
            <td><span class="badge ${badgeColor} px-2 py-1 small">${cita.prioridad}</span></td>
            <td>
                <button type="button" class="btn btn-sm btn-outline-danger border-0" onclick="eliminarCita(${i})">
                    <i class="bi bi-trash3"></i>
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    }
}

function eliminarCita(indice) {
    if (confirm("¿Desea cancelar esta cita médica?")) {
        listaCitas.splice(indice, 1);
        actualizarTablaCitas();
    }
}