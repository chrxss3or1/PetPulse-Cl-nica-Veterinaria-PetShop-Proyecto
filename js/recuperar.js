document.getElementById("recuperarForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var correo = document.getElementById("recuperarCorreo").value.trim();

    if (correo === "") {
        alert("Por favor, escriba un correo electrónico válido.");
    } else {
        alert("Se ha enviado un correo de soporte técnico a: " + correo + "\nPor favor revise su bandeja de entrada o spam.");
        window.location.href = "index.html";
    }
});