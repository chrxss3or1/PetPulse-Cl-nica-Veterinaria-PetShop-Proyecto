document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("password").value.trim();
    var alertContainer = document.getElementById("alertContainer");

    alertContainer.innerHTML = "";

    if (usuario === "" || contrasena === "") {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> Todos los campos son obligatorios.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        return;
    }

    fetch("app/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usuario, password: contrasena })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "home.html";
        } else {
            alertContainer.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> ${data.message || 'Usuario o contraseña incorrectos.'}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    })
    .catch(error => {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> No se pudo conectar con el servidor.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    });
});