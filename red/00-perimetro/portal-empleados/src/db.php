<?php
require __DIR__ . '/config.php';

// Errores de consulta: devolver false en vez de lanzar excepción (PHP 8.1+).
mysqli_report(MYSQLI_REPORT_OFF);

$con = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if (!$con) {
    http_response_code(500);
    exit('No se pudo conectar a la base de datos.');
}
mysqli_set_charset($con, 'utf8mb4');
