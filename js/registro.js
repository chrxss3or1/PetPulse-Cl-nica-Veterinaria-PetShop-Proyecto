document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombreCompleto").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var contrasena = document.getElementById("password").value.trim();
    var confirmar = document.getElementById("confirmPassword").value.trim();
    var alertContainer = document.getElementById("alertContainer");

    alertContainer.innerHTML = "";

    if (nombre === "" || correo === "" || contrasena === "" || confirmar === "") {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> Todos los campos son obligatorios para el registro.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return;
    }

    if (contrasena !== confirmar) {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> Las contraseñas ingresadas no coinciden.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return;
    }

    fetch("app/auth/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, email: correo, password: contrasena })
    })
    .then(function(response) { return response.json(); })
    .then(function(data) {
        if (data.success) {
            alertContainer.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Registro Exitoso!</strong> Sesión iniciada. Entrando al panel...
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            document.getElementById("registroForm").reset();
            setTimeout(function() {
                window.location.href = "home.html";
            }, 1200);
        } else {
            alertContainer.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> ${data.message || 'No se pudo completar el registro.'}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    })
    .catch(function() {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> No se pudo conectar con el servidor.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    });
});