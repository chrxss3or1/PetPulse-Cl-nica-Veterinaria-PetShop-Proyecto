<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();

$nombre   = trim($data['nombre'] ?? '');
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($nombre) || empty($email) || empty($password)) {
    jsonResponse(false, 'Todos los campos son obligatorios.', null, [], 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'El formato de correo electrónico no es válido.', null, [], 400);
}

$pdo = getPDO();

$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    jsonResponse(false, 'El correo electrónico ya se encuentra registrado.', null, [], 400);
}

$hashPassword = password_hash($password, PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password, rol, estado) VALUES (?, ?, ?, 'cliente', 'Activo')");
if ($stmt->execute([$nombre, $email, $hashPassword])) {
    $nuevoId = $pdo->lastInsertId();

    $_SESSION['usuario_id'] = $nuevoId;
    $_SESSION['usuario_nombre'] = $nombre;
    $_SESSION['usuario_email'] = $email;
    $_SESSION['usuario_rol'] = 'cliente';

    jsonResponse(true, 'Usuario registrado con éxito.');
} else {
    jsonResponse(false, 'Error al registrar el usuario.', null, [], 500);
}
