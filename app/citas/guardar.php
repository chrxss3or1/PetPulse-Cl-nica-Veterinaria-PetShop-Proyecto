<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();

$paciente     = trim($data['paciente'] ?? '');
$especialista = trim($data['especialista'] ?? '');
$fecha        = trim($data['fecha'] ?? '');
$hora         = trim($data['hora'] ?? '');
$prioridad    = trim($data['prioridad'] ?? 'Verde');

if (empty($paciente) || empty($fecha) || empty($hora)) {
    jsonResponse(false, 'Faltan campos obligatorios para agendar la cita.', null, [], 400);
}

try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("INSERT INTO citas (mascota_nombre, propietario_nombre, servicio, prioridad, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)");

    if ($stmt->execute([$paciente, 'Propietario', $especialista, $prioridad, $fecha, $hora])) {
        jsonResponse(true, 'Cita agendada correctamente.');
    } else {
        jsonResponse(false, 'Error al guardar la cita.', null, [], 500);
    }
} catch (Exception $e) {
    jsonResponse(false, 'Error en el servidor: ' . $e->getMessage(), null, [], 500);
}