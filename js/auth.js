$(document).ready(function () {
    // Iniciar Sesión
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        var email = $("#usuario").val().trim();
        var password = $("#password").val().trim();

        $.ajax({
            url: "app/auth/login.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email: email, password: password }),
            success: function (res) {
                if (res.success) {
                    window.location.href = "home.html";
                }
            },
            error: function (xhr) {
                var err = xhr.responseJSON ? xhr.responseJSON.message : "Error al iniciar sesión.";
                $("#alertContainer").html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error:</strong> ${err}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `);
            }
        });
    });

    // Registro
    $("#registroForm").submit(function (e) {
        e.preventDefault();
        var nombre = $("#nombreCompleto").val().trim();
        var email = $("#correo").val().trim();
        var password = $("#password").val().trim();
        var confirm = $("#confirmPassword").val().trim();

        if (password !== confirm) {
            $("#alertContainer").html(`<div class="alert alert-danger">Las contraseñas no coinciden.</div>`);
            return;
        }

        $.ajax({
            url: "app/auth/register.php",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ nombre: nombre, email: email, password: password }),
            success: function (res) {
                $("#alertContainer").html(`<div class="alert alert-success">${res.message}</div>`);
                setTimeout(function () { window.location.href = "index.html"; }, 1500);
            },
            error: function (xhr) {
                var err = xhr.responseJSON ? xhr.responseJSON.message : "Error al registrar.";
                $("#alertContainer").html(`<div class="alert alert-danger">${err}</div>`);
            }
        });
    });
});