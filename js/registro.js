document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombreCompleto").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var usuario = document.getElementById("nuevoUsuario").value.trim();
    var contrasena = document.getElementById("password").value.trim();
    var confirmar = document.getElementById("confirmPassword").value.trim();
    var alertContainer = document.getElementById("alertContainer");

    alertContainer.innerHTML = "";

    if (nombre === "" || correo === "" || usuario === "" || contrasena === "" || confirmar === "") {
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

    alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Registro Exitoso!</strong> Cuenta creada correctamente. Redireccionando al login...
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    document.getElementById("registroForm").reset();

    setTimeout(function() {
        window.location.href = "index.html";
    }, 2000);
});