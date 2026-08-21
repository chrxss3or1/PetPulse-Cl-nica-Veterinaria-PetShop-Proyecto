<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();
$id = intval($data['id'] ?? 0);

if ($id <= 0) {
    jsonResponse(false, 'ID inválido.', null, [], 400);
}

$pdo = getPDO();
$stmt = $pdo->prepare("DELETE FROM citas WHERE id = ?");
if ($stmt->execute([$id])) {
    jsonResponse(true, 'Cita eliminada correctamente.');
} else {
    jsonResponse(false, 'Error al eliminar cita.', null, [], 500);
}
