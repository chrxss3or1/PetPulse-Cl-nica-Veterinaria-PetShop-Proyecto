<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$pdo = getPDO();
$stmt = $pdo->query("SELECT * FROM citas ORDER BY fecha ASC, hora ASC");
$citas = $stmt->fetchAll();

jsonResponse(true, 'Citas obtenidas.', $citas);
