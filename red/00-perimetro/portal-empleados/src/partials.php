<?php
// Cabecera y pie compartidos del portal. Identidad visual de HELIX Corp.

function helix_head(string $title, bool $with_nav = true): void
{
    $t = htmlspecialchars($title, ENT_QUOTES);
    echo <<<HTML
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$t · HELIX Corp</title>
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
HTML;

    $mark = helix_mark();
    echo <<<HTML
<header class="topbar">
  <span class="brand">
    $mark
    <span class="wordmark">HELIX</span>
    <span class="sub">Portal de Autogestión</span>
  </span>
HTML;

    if ($with_nav) {
        $emp = $_SESSION['emp'] ?? null;
        echo '<nav class="nav">';
        echo '<a href="/directorio.php">Directorio</a>';
        if ($emp) {
            echo '<a href="/panel.php">Mi ficha</a>';
            echo '<a class="muted" href="/logout.php">Salir</a>';
        } else {
            echo '<a href="/index.php">Ingresar</a>';
        }
        echo '</nav>';
    }
    echo "</header>\n";
}

function helix_mark(): string
{
    // Emblema de HELIX: dos hebras helicoidales. Acá ambas en cian corporativo.
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
    $y = date('Y');
    echo <<<HTML
<footer class="footer">
  <span>© $y HELIX Corporation — Uso interno. v1.2 (2019)</span>
  <span class="mono">helixcorp.local · 10.0.0.10</span>
</footer>
</body>
</html>
HTML;
}
