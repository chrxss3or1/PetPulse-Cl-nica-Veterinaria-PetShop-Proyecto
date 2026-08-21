<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$nombre    = trim($_POST['nombre'] ?? '');
$categoria = trim($_POST['categoria'] ?? '');
$precio    = floatval($_POST['precio'] ?? 0);
$stock     = intval($_POST['stock'] ?? 0);
$imagenRuta = null;

if (empty($nombre) || $precio <= 0) {
    jsonResponse(false, 'Datos de producto inválidos.', null, [], 400);
}

if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
    $dirSubida = __DIR__ . '/../../uploads/productos/';
    if (!is_dir($dirSubida)) {
        mkdir($dirSubida, 0777, true);
    }

    $ext = pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION);
    $nombreArchivo = time() . '_' . uniqid() . '.' . $ext;
    $targetFile = $dirSubida . $nombreArchivo;

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $targetFile)) {
        $imagenRuta = 'uploads/productos/' . $nombreArchivo;
    }
}

$pdo = getPDO();
$stmt = $pdo->prepare("INSERT INTO productos (nombre, categoria, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)");
if ($stmt->execute([$nombre, $categoria, $precio, $stock, $imagenRuta])) {
    jsonResponse(true, 'Producto registrado correctamente.');
} else {
    jsonResponse(false, 'Error al registrar el producto.', null, [], 500);
}
