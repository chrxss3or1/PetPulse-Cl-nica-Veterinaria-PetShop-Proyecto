<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();
$mascota = trim($data['mascota'] ?? 'Paciente sin nombre');
$nivel   = trim($data['nivel'] ?? 'Rojo');
$puntaje = intval($data['puntaje'] ?? 3);

$pdo = getPDO();
$stmt = $pdo->prepare("INSERT INTO triajes (mascota, nivel, puntaje) VALUES (?, ?, ?)");
if ($stmt->execute([$mascota, $nivel, $puntaje])) {
    jsonResponse(true, 'Triaje registrado.');
} else {
    jsonResponse(false, 'Error al guardar el triaje.', null, [], 500);
}
