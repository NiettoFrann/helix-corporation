<?php
// Cabecera y pie compartidos. Misma identidad visual que el resto de la red
// de HELIX (portal-empleados / web-institucional): son la misma empresa.

function helix_head(string $title): void
{
    $t = htmlspecialchars($title, ENT_QUOTES);
    $cssfile = $_SERVER['DOCUMENT_ROOT'] . '/assets/style.css';
    $v = @filemtime($cssfile) ?: 1;
    echo <<<HTML
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$t · HELIX Corp</title>
<link rel="stylesheet" href="/assets/style.css?v=$v">
</head>
<body>
HTML;

    $mark = helix_mark();
    echo <<<HTML
<header class="topbar">
  <a class="brand" href="/index.php">
    $mark
    <span class="wordmark">HELIX</span>
    <span class="sub">Centro de Descargas</span>
  </a>
  <nav class="nav">
    <a class="pill" href="ftp://127.0.0.1/">Servidor FTP</a>
  </nav>
</header>
HTML;
}

function helix_mark(): string
{
    return '<svg viewBox="0 0 48 48" fill="none" width="26" height="26" aria-label="HELIX">'
        . '<g stroke-linecap="round" stroke-linejoin="round">'
        . '<path d="M15 8 C 21 16, 21 32, 15 40" stroke="var(--system)" stroke-width="2.4"/>'
        . '<path d="M33 8 C 27 16, 27 32, 33 40" stroke="var(--system)" stroke-width="2.4"/>'
        . '<line x1="16.5" y1="14" x2="31.5" y2="14" stroke="var(--system)" stroke-width="2" opacity="0.45"/>'
        . '<line x1="16.5" y1="34" x2="31.5" y2="34" stroke="var(--system)" stroke-width="2" opacity="0.45"/>'
        . '<line x1="19.5" y1="24" x2="28.5" y2="24" stroke="var(--system)" stroke-width="3"/>'
        . '</g></svg>';
}

function helix_foot(): void
{
    echo <<<HTML
<footer class="footer">
  <span>© 2017 HELIX Corporation — Servidor de descargas (temporal).</span>
  <span class="mono">helixcorp.local · 10.0.0.12</span>
</footer>
</body>
</html>
HTML;
}
