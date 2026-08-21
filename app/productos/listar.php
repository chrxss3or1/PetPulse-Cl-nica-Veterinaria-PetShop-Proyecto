<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$pdo = getPDO();
$stmt = $pdo->query("SELECT * FROM productos ORDER BY id DESC");
jsonResponse(true, 'Productos obtenidos.', $stmt->fetchAll());
