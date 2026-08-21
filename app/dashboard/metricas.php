<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';
 
$pdo = getPDO();
 
$totalMascotas = $pdo->query("SELECT COUNT(*) FROM mascotas")->fetchColumn();
$totalCitas    = $pdo->query("SELECT COUNT(*) FROM citas")->fetchColumn();
$totalTriajes  = $pdo->query("SELECT COUNT(*) FROM triajes WHERE nivel = 'Rojo'")->fetchColumn();
$totalProductos= $pdo->query("SELECT COUNT(*) FROM productos")->fetchColumn();
 
$ventasMes = $pdo->query(
    "SELECT COALESCE(SUM(total), 0) FROM pedidos 
     WHERE MONTH(creado_en) = MONTH(CURRENT_DATE()) AND YEAR(creado_en) = YEAR(CURRENT_DATE())"
)->fetchColumn();
 
jsonResponse(true, 'Métricas del sistema', [
    'mascotas'  => (int) $totalMascotas,
    'citas'     => (int) $totalCitas,
    'triajes'   => (int) $totalTriajes,
    'productos' => (int) $totalProductos,
    'ventas'    => (float) $ventasMes
]);
