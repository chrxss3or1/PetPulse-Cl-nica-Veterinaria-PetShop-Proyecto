<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();
$id = intval($data['id'] ?? 0);

if ($id <= 0) {
    jsonResponse(false, 'ID de mascota inválido.', null, [], 400);
}

$pdo = getPDO();

$stmt = $pdo->prepare("DELETE FROM mascotas WHERE id = ?");
if ($stmt->execute([$id])) {
    jsonResponse(true, 'Mascota eliminada correctamente.');
} else {
    jsonResponse(false, 'Error al eliminar la mascota.', null, [], 500);
}
