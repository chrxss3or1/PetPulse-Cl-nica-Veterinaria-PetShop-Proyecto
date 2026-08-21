<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$pdo = getPDO();
$stmt = $pdo->query("SELECT * FROM mascotas ORDER BY id DESC");
$mascotas = $stmt->fetchAll();

jsonResponse(true, 'Lista de mascotas obtenida.', $mascotas);
