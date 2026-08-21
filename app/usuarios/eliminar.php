<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();
$id = intval($data['id'] ?? 0);

if ($id <= 0) {
    jsonResponse(false, 'ID de usuario no válido.', null, [], 400);
}

try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
    if ($stmt->execute([$id])) {
        jsonResponse(true, 'Usuario eliminado correctamente.');
    } else {
        jsonResponse(false, 'No se pudo eliminar el usuario.');
    }
} catch (Exception $e) {
    jsonResponse(false, 'Error en el servidor: ' . $e->getMessage(), null, [], 500);
}