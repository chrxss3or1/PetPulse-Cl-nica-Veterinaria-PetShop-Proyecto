<?php
session_start();
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';
 
$data = getJsonInput();
 
$total  = floatval($data['total'] ?? 0);
$metodo = trim($data['metodo'] ?? 'tarjeta');
 
if ($total <= 0) {
    jsonResponse(false, 'El total del pedido no es válido.', null, [], 400);
}
 
$pdo = getPDO();
$stmt = $pdo->prepare("INSERT INTO pedidos (total, metodo_pago) VALUES (?, ?)");
if ($stmt->execute([$total, $metodo])) {
    jsonResponse(true, 'Pedido registrado correctamente.', ['id' => $pdo->lastInsertId()]);
} else {
    jsonResponse(false, 'Error al registrar el pedido.', null, [], 500);
}