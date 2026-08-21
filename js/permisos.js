$(document).ready(function () {
    // 1. Obtener el nombre del archivo actual
    var paginaActual = window.location.pathname.split("/").pop();

    if (paginaActual === "" || paginaActual === "index.html") {
        return;
    }

    // 3. Petición para verificar la sesión
    $.ajax({
        url: "app/auth/session.php", 
        type: "GET",
        dataType: "json",
        success: function (res) {
            if (res.success && res.data) {
                var rol = res.data.rol ? res.data.rol.toLowerCase() : 'cliente'; 

                if (rol === 'cliente') {
                    $(".menu-veterinario").hide();
                    $(".menu-admin").hide();
                    
                    if (window.location.pathname.includes("admin.html") || window.location.pathname.includes("veterinario.html")) {
                        window.location.href = "home.html";
                    }
                } 
                else if (rol === 'veterinario') {
                    $(".menu-veterinario").show();
                    $(".menu-admin").hide();

                    if (window.location.pathname.includes("admin.html")) {
                        window.location.href = "home.html";
                    }
                } 
                else if (rol === 'admin') {
                    $(".menu-veterinario").show();
                    $(".menu-admin").show();
                }
            } else {
                window.location.href = "index.html";
            }
        },
        error: function () {
            window.location.href = "index.html";
        }
    });
});