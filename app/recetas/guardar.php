<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();
$mascota     = trim($data['mascota'] ?? '');
$diagnostico = trim($data['diagnostico'] ?? '');
$tratamiento = trim($data['tratamiento'] ?? '');
$receta      = trim($data['receta'] ?? '');

if (empty($mascota) || empty($diagnostico)) {
    jsonResponse(false, 'Campos incompletos.', null, [], 400);
}

$pdo = getPDO();
$stmt = $pdo->prepare("INSERT INTO recetas (mascota, diagnostico, tratamiento, receta) VALUES (?, ?, ?, ?)");
if ($stmt->execute([$mascota, $diagnostico, $tratamiento, $receta])) {
    jsonResponse(true, 'Receta guardada.');
} else {
    jsonResponse(false, 'Error al guardar la receta.', null, [], 500);
}
