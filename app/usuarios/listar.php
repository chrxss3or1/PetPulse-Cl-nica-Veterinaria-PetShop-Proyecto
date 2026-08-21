<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

try {
    $pdo = getPDO();
    $stmt = $pdo->query("SELECT id, nombre, email, rol, estado FROM usuarios ORDER BY id DESC");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    jsonResponse(true, 'Usuarios obtenidos correctamente.', $usuarios);
} catch (Exception $e) {
    jsonResponse(false, 'Error al obtener usuarios: ' . $e->getMessage(), null, [], 500);
}