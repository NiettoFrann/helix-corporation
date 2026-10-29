<?php
// Núcleo del panel: sesión y autenticación.
require_once __DIR__ . '/config.php';

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

function cms_logueado(): bool
{
    return !empty($_SESSION['cms_user']);
}

// Exige sesión; si no hay, manda al login.
function cms_requerir_login(): void
{
    if (!cms_logueado()) {
        header('Location: /cms/index.php');
        exit;
    }
}

// Valida credenciales contra la config del CMS.
function cms_login(string $usuario, string $clave): bool
{
    if ($usuario === CMS_USER && $clave === CMS_PASS) {
        $_SESSION['cms_user'] = $usuario;
        return true;
    }
    return false;
}

function cms_logout(): void
{
    $_SESSION = [];
    session_destroy();
}
