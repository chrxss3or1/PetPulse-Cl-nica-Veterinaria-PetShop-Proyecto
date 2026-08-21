<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$data = getJsonInput();

$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

if (empty($email) || empty($password)) {
    jsonResponse(false, 'Por favor ingrese correo y contraseña.', null, [], 400);
}

$pdo = getPDO();
$stmt = $pdo->prepare("SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$usuario = $stmt->fetch();

$passwordValida = $usuario && (password_verify($password, $usuario['password']) || $password === $usuario['password']);

if (!$usuario || !$passwordValida) {
    jsonResponse(false, 'Credenciales incorrectas.', null, [], 401);
}

$_SESSION['usuario_id']     = $usuario['id'];
$_SESSION['usuario_nombre'] = $usuario['nombre'];
$_SESSION['usuario_rol']    = $usuario['rol'];

jsonResponse(true, 'Inicio de sesión exitoso.', [
    'id'     => $usuario['id'],
    'nombre' => $usuario['nombre'],
    'rol'    => $usuario['rol']
]);
