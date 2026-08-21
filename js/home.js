$(document).ready(function () {
    $.ajax({
        url: "app/dashboard/metricas.php",
        type: "GET",
        success: function (res) {
            if (res.success) {
                $("#statMascotas").text(res.data.mascotas);
                $("#statCitas").text(res.data.citas);
                $("#statTriajes").text(res.data.triajes);
                $("#statProductos").text(res.data.productos);
                
                var ventasFormateadas = new Intl.NumberFormat('es-CR', { 
                    style: 'currency', 
                    currency: 'CRC',
                    maximumFractionDigits: 0 
                }).format(res.data.ventas);

                $("#statVentas").text(ventasFormateadas);
            }
        }
    });
});