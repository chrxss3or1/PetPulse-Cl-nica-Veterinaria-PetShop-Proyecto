<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$pdo = getPDO();
$stmt = $pdo->query("SELECT * FROM recetas ORDER BY id DESC");
jsonResponse(true, 'Recetas obtenidas.', $stmt->fetchAll());
