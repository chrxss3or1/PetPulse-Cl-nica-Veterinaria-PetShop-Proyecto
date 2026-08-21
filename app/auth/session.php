<?php
session_start();
require_once __DIR__ . '/../../helpers/response.php';

if (isset($_SESSION['usuario_id'])) {
    jsonResponse(true, 'Sesión activa.', [
        'id'     => $_SESSION['usuario_id'],
        'nombre' => $_SESSION['usuario_nombre'],
        'rol'    => $_SESSION['usuario_rol']
    ]);
} else {
    jsonResponse(false, 'No hay sesión activa.', null, [], 401);
}
