<?php
// Sala de prensa pública: solo muestra lo PUBLICADO. Los borradores
// no se exponen acá (viven en el panel del CMS).
require __DIR__ . '/partials.php';
require __DIR__ . '/contenido.php';

helix_head('Prensa');

$nota = isset($_GET['nota']) ? contenido_leer('publicado', (string) $_GET['nota']) : null;
?>
<main class="wrap">
<?php if ($nota): ?>
  <p class="muted" style="margin-bottom:1.2rem"><a href="/prensa.php">← Volver a prensa</a></p>
  <article class="doc">
    <h1><?= htmlspecialchars($nota['titulo']) ?></h1>
    <div class="meta"><?= htmlspecialchars($nota['fecha']) ?> · <?= htmlspecialchars($nota['autor']) ?></div>
    <?= $nota['cuerpo'] ?>
  </article>
<?php else: ?>
  <h1>Sala de prensa</h1>
  <p class="lead">Novedades y comunicados oficiales de HELIX Corporation.</p>
  <ul class="press">
<?php foreach (contenido_listar('publicado') as $n): ?>
    <li>
      <time><?= htmlspecialchars($n['fecha']) ?></time>
      <span class="ttl"><a href="/prensa.php?nota=<?= urlencode($n['archivo']) ?>"><?= htmlspecialchars($n['titulo']) ?></a></span>
    </li>
<?php endforeach; ?>
  </ul>
  <p class="muted" style="margin-top:2rem; font-size:0.82rem">Para consultas de prensa: prensa@helixcorp.com</p>
<?php endif; ?>
</main>
<?php helix_foot();
