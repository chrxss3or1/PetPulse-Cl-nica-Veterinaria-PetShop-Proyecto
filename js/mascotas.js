var listaMascotas = [];


document.getElementById("mascotaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombreMascota").value.trim();
    var especie = document.getElementById("especieMascota").value;
    var edad = document.getElementById("edadMascota").value.trim();
    
    var inputFoto = document.getElementById("fotoMascota");
    var archivo = inputFoto.files[0];
    var alertContainer = document.getElementById("alertContainer");

    var lector = new FileReader();
    
    lector.onloadend = function() {
        var imagenBase64 = lector.result; 

        var nuevaMascota = {
            id: Date.now(), 
            nombre: nombre,
            especie: especie,
            edad: edad,
            foto: imagenBase64
        };

        listaMascotas.push(nuevaMascota);

        actualizarListaMascotas();

        alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show bg-dark text-success border-success" role="alert">
                <strong>¡Excelente!</strong> Expediente de ${nombre} creado con fotografía de forma correcta.
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        document.getElementById("mascotaForm").reset();
    };

    if (archivo) {
        lector.readAsDataURL(archivo);
    }
});


function actualizarListaMascotas() {
    var contenedor = document.getElementById("contenedorMascotas");
    

    contenedor.innerHTML = "";

    if (listaMascotas.length === 0) {
        contenedor.innerHTML = '<p id="textoVacio" class="text-secondary ps-3">No hay mascotas registradas actualmente.</p>';
        return;
    }

    for (var i = 0; i < listaMascotas.length; i++) {
        var mascota = listaMascotas[i];

        contenedor.innerHTML += `
            <div class="col">
                <div class="card bg-black text-white border-secondary h-100 shadow-sm">
                    <!-- Pintamos la foto cargada por el usuario -->
                    <img src="${mascota.foto}" class="card-img-top object-fit-cover" alt="Foto de ${mascota.nombre}" style="height: 180px;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-personalizado-morado mb-1">${mascota.nombre}</h5>
                        <p class="card-text mb-1 text-secondary small"><strong>Especie:</strong> ${mascota.especie}</p>
                        <p class="card-text mb-3 text-secondary small"><strong>Edad:</strong> ${mascota.edad} años</p>
                        
                        <!-- Botón preparado para conectar con el Grupo 2 (Tu siguiente módulo) -->
                        <a href="triaje.html?id=${mascota.id}" class="btn btn-outline-warning btn-sm w-100 fw-bold">
                            🩺 Enviar a Triaje de Urgencia
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}