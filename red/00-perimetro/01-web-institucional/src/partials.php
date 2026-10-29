<?php
// Cabecera y pie compartidos. Misma identidad visual que el Portal de
// Autogestión (portal-empleados): las dos máquinas son la misma empresa.

function helix_head(string $title, string $nav = 'site'): void
{
    $t = htmlspecialchars($title, ENT_QUOTES);
    // Versión del CSS para que el navegador no sirva una copia vieja de caché.
    $cssfile = $_SERVER['DOCUMENT_ROOT'] . '/assets/style.css';
    $v = @filemtime($cssfile) ?: 1;
    echo <<<HTML
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="HelixCMS 1.4">
<title>$t · HELIX Corp</title>
<link rel="stylesheet" href="/assets/style.css?v=$v">
</head>
<body>
HTML;

    $mark = helix_mark();
    $sub = $nav === 'cms' ? 'HelixCMS' : 'Sitio Institucional';
    echo <<<HTML
<header class="topbar">
  <a class="brand" href="/index.php">
    $mark
    <span class="wordmark">HELIX</span>
    <span class="sub">$sub</span>
  </a>
HTML;

    if ($nav === 'site') {
        echo '<nav class="nav">';
        echo '<a href="/index.php">Inicio</a>';
        echo '<a href="/nosotros.php">Nosotros</a>';
        echo '<a href="/servicios.php">Servicios</a>';
        echo '<a href="/prensa.php">Prensa</a>';
        echo '<a class="hide-sm" href="/contacto.php">Contacto</a>';
        echo '</nav>';
    } elseif ($nav === 'cms') {
        echo '<nav class="nav">';
        echo '<a href="/cms/panel.php">Contenidos</a>';
        echo '<a href="/cms/medios.php">Medios</a>';
        echo '<a class="muted" href="/cms/logout.php">Salir</a>';
        echo '</nav>';
    }
    echo "</header>\n";
}

function helix_mark(): string
{
    // Emblema de HELIX: dos hebras helicoidales en cian corporativo.
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
  <span>© 2019 HELIX Corporation — Blindamos el futuro digital.</span>
  <span class="mono">Publicado con HelixCMS 1.4</span>
</footer>
</body>
</html>
HTML;
}
