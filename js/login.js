document.getElementById("loginForm").addEventListener("submit", function(event) {

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

    if (usuario === "admin" && contrasena === "1234") {
   
        window.location.href = "home.html";
    } else {
       
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error:</strong> Usuario o contraseña incorrectos. Intenta de nuevo.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
});