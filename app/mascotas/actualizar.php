<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';
 
$data = getJsonInput();
 
$id      = intval($data['id'] ?? 0);
$nombre  = trim($data['nombre'] ?? '');
$especie = trim($data['especie'] ?? '');
$edad    = intval($data['edad'] ?? 0);
 
if ($id <= 0 || empty($nombre) || empty($especie)) {
    jsonResponse(false, 'Datos de la mascota incompletos o inválidos.', null, [], 400);
}
 
$pdo = getPDO();
 
$stmt = $pdo->prepare("UPDATE mascotas SET nombre = ?, especie = ?, edad = ? WHERE id = ?");
if ($stmt->execute([$nombre, $especie, $edad, $id])) {
    jsonResponse(true, 'Mascota actualizada correctamente.');
} else {
    jsonResponse(false, 'Error al actualizar la mascota.', null, [], 500);
}
