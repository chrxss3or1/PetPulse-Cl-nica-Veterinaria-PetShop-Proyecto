<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$nombre = trim($_POST['nombre'] ?? '');
$especie = trim($_POST['especie'] ?? '');
$edad = intval($_POST['edad'] ?? 0);
$fotoRuta = null;

if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
    $dirSubida = '../../uploads/';
    if (!is_dir($dirSubida)) {
        mkdir($dirSubida, 0777, true);
    }
    
    $extension = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
    $nombreArchivo = uniqid('pet_') . '.' . $extension;
    $rutaFinal = $dirSubida . $nombreArchivo;
    
    if (move_uploaded_file($_FILES['foto']['tmp_name'], $rutaFinal)) {
        $fotoRuta = 'uploads/' . $nombreArchivo;
    }
}

$pdo = getPDO();
$stmt = $pdo->prepare("INSERT INTO mascotas (nombre, especie, edad, foto) VALUES (?, ?, ?, ?)");

if ($stmt->execute([$nombre, $especie, $edad, $fotoRuta])) {
    jsonResponse(true, 'Mascota registrada exitosamente.');
} else {
    jsonResponse(false, 'Error al registrar la mascota.', null, [], 500);
}