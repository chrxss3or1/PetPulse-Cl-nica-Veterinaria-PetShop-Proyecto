<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

$pdo = getPDO();
$nivel = trim($_GET['nivel'] ?? '');

if ($nivel !== '') {
    $stmt = $pdo->prepare("SELECT * FROM triajes WHERE nivel = ? ORDER BY id DESC");
    $stmt->execute([$nivel]);
} else {
    $stmt = $pdo->query("SELECT * FROM triajes ORDER BY id DESC");
}

jsonResponse(true, 'Triajes obtenidos.', $stmt->fetchAll());
