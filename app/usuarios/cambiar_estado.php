<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = intval($data['id'] ?? 0);
$nuevoEstado = trim($data['estado'] ?? '');

if ($id <= 0 || !in_array($nuevoEstado, ['Activo', 'Inactivo'])) {
    jsonResponse(false, 'Datos de actualización inválidos.', null, [], 400);
}

try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("UPDATE usuarios SET estado = ? WHERE id = ?");
    if ($stmt->execute([$nuevoEstado, $id])) {
        jsonResponse(true, 'Estado actualizado exitosamente.');
    } else {
        jsonResponse(false, 'No se pudo actualizar el estado.');
    }
} catch (Exception $e) {
    jsonResponse(false, 'Error en el servidor: ' . $e->getMessage(), null, [], 500);
}