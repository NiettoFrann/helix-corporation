<?php
// Panel de contenidos: lo publicado y los borradores. Requiere sesión.
require __DIR__ . '/cms.php';
require __DIR__ . '/../contenido.php';
require __DIR__ . '/../partials.php';
cms_requerir_login();

// ?ver=<seccion>/<archivo> abre una nota.
$ver = null;
if (isset($_GET['ver'])) {
    [$sec, $arc] = array_pad(explode('/', (string) $_GET['ver'], 2), 2, '');
    $ver = contenido_leer($sec, $arc);
}

helix_head('Contenidos', 'cms');
?>
<main class="wrap">
<?php if ($ver): ?>
  <p class="muted" style="margin-bottom:1.2rem"><a href="/cms/panel.php">← Volver a contenidos</a></p>
  <?php $esPub = $ver['seccion'] === 'publicado'; ?>
  <article class="doc">
    <span class="state <?= $esPub ? 'pub' : 'draft' ?>"><?= $esPub ? 'Publicado' : 'Borrador' ?></span>
    <h1 style="margin-top:0.8rem"><?= htmlspecialchars($ver['titulo']) ?></h1>
    <div class="meta"><?= htmlspecialchars($ver['fecha']) ?> · <?= htmlspecialchars($ver['autor']) ?></div>
    <?= $ver['cuerpo'] ?>
  </article>
<?php else: ?>
  <div class="panel-head">
    <div>
      <h1>Contenidos</h1>
      <p class="lead">Notas de prensa y comunicados del sitio.</p>
    </div>
    <a class="cta ghost" href="/cms/medios.php">Subir medios</a>
  </div>

  <h2>Borradores</h2>
  <table>
    <thead><tr><th>Título</th><th>Fecha</th><th>Autor</th><th></th></tr></thead>
    <tbody>
<?php foreach (contenido_listar('borradores') as $n): ?>
      <tr>
        <td><?= htmlspecialchars($n['titulo']) ?></td>
        <td class="mono"><?= htmlspecialchars($n['fecha']) ?></td>
        <td><?= htmlspecialchars($n['autor']) ?></td>
        <td><a href="/cms/panel.php?ver=borradores/<?= urlencode($n['archivo']) ?>">abrir</a></td>
      </tr>
<?php endforeach; ?>
    </tbody>
  </table>

  <h2>Publicado</h2>
  <table>
    <thead><tr><th>Título</th><th>Fecha</th><th>Autor</th><th></th></tr></thead>
    <tbody>
<?php foreach (contenido_listar('publicado') as $n): ?>
      <tr>
        <td><?= htmlspecialchars($n['titulo']) ?></td>
        <td class="mono"><?= htmlspecialchars($n['fecha']) ?></td>
        <td><?= htmlspecialchars($n['autor']) ?></td>
        <td><a href="/cms/panel.php?ver=publicado/<?= urlencode($n['archivo']) ?>">abrir</a></td>
      </tr>
<?php endforeach; ?>
    </tbody>
  </table>
<?php endif; ?>
</main>
<?php helix_foot();
