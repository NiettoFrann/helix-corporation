<?php
// Lectura del contenido del CMS. El contenido vive FUERA del webroot
// (/opt/helixcms/contenido), así que no se sirve como archivo estático:
// solo se llega a él a través de estas funciones.

const CONTENIDO_DIR = '/opt/helixcms/contenido';

// Devuelve la ruta real de una nota de una sección, o null si el nombre es
// inválido o se intenta salir de la sección (anti path traversal).
function contenido_ruta(string $seccion, string $nombre): ?string
{
    if (!in_array($seccion, ['publicado', 'borradores'], true)) {
        return null;
    }
    // Solo el nombre del archivo: nada de barras ni "..".
    $nombre = basename($nombre);
    if ($nombre === '' || !preg_match('/^[a-z0-9._-]+\.html$/i', $nombre)) {
        return null;
    }
    $ruta = CONTENIDO_DIR . '/' . $seccion . '/' . $nombre;
    return is_file($ruta) ? $ruta : null;
}

// Lista las notas de una sección, ordenadas por fecha descendente.
function contenido_listar(string $seccion): array
{
    if (!in_array($seccion, ['publicado', 'borradores'], true)) {
        return [];
    }
    $notas = [];
    foreach (glob(CONTENIDO_DIR . '/' . $seccion . '/*.html') ?: [] as $ruta) {
        $notas[] = contenido_leer($seccion, basename($ruta));
    }
    usort($notas, fn($a, $b) => strcmp($b['fecha'], $a['fecha']));
    return array_filter($notas);
}

// Lee una nota: cabecera (Título/Fecha/Autor) + cuerpo HTML del autor.
function contenido_leer(string $seccion, string $nombre): ?array
{
    $ruta = contenido_ruta($seccion, $nombre);
    if ($ruta === null) {
        return null;
    }
    $crudo = file_get_contents($ruta);
    [$cabecera, $cuerpo] = array_pad(explode("\n---\n", $crudo, 2), 2, '');
    $meta = ['titulo' => $nombre, 'fecha' => '', 'autor' => ''];
    foreach (explode("\n", trim($cabecera)) as $linea) {
        if (!str_contains($linea, ':')) {
            continue;
        }
        [$k, $v] = array_map('trim', explode(':', $linea, 2));
        // Clave normalizada a ASCII: "Título" -> "titulo".
        $k = strtr(strtolower($k), ['í' => 'i', 'á' => 'a', 'é' => 'e', 'ó' => 'o', 'ú' => 'u']);
        $meta[$k] = $v;
    }
    return [
        'seccion' => $seccion,
        'archivo' => basename($ruta),
        'titulo'  => $meta['titulo'] ?? $nombre,
        'fecha'   => $meta['fecha'] ?? '',
        'autor'   => $meta['autor'] ?? '',
        'cuerpo'  => trim($cuerpo),
    ];
}
