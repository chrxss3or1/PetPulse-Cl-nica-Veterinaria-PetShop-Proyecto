<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();
$id = intval($data['id'] ?? 0);

$pdo = getPDO();
$stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");
if ($stmt->execute([$id])) {
    jsonResponse(true, 'Producto eliminado.');
} else {
    jsonResponse(false, 'Error al eliminar producto.', null, [], 500);
}
