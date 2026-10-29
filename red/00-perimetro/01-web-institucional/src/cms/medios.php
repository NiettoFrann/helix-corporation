<?php
// Gestor de medios: subir imágenes para usar en las notas. Requiere sesión.
require __DIR__ . '/cms.php';
require __DIR__ . '/../partials.php';
cms_requerir_login();

$msg = '';
$clase = 'info';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['archivo'])) {
    $f = $_FILES['archivo'];

    if ($f['error'] !== UPLOAD_ERR_OK) {
        $msg = 'No se pudo subir el archivo. Probá de nuevo.';
        $clase = 'err';
    } else {
        // Validación: solo aceptamos imágenes.
        // (Chequeamos el tipo que informa el navegador.)
        $tipo = $f['type'] ?? '';
        if (strpos($tipo, 'image/') !== 0) {
            $msg = 'Formato no permitido. Solo se aceptan imágenes (JPG, PNG, GIF, WEBP).';
            $clase = 'err';
        } else {
            $nombre = basename($f['name']);
            $destino = UPLOAD_DIR . '/' . $nombre;
            if (move_uploaded_file($f['tmp_name'], $destino)) {
                $msg = 'Archivo subido: ' . UPLOAD_URL . '/' . $nombre;
                $clase = 'ok';
            } else {
                $msg = 'No se pudo guardar el archivo en el servidor.';
                $clase = 'err';
            }
        }
    }
}

// Listado de lo que ya está subido.
$subidos = [];
foreach (glob(UPLOAD_DIR . '/*') ?: [] as $ruta) {
    if (is_file($ruta)) {
        $subidos[] = basename($ruta);
    }
}
sort($subidos);

helix_head('Medios', 'cms');
?>
<main class="wrap">
  <div class="panel-head">
    <div>
      <h1>Medios</h1>
      <p class="lead">Subí las imágenes que después insertás en las notas.</p>
    </div>
    <a class="cta ghost" href="/cms/panel.php">← Contenidos</a>
  </div>

  <?php if ($msg): ?>
    <div class="alert <?= $clase ?>"><?= htmlspecialchars($msg) ?></div>
  <?php endif; ?>

  <form class="card" method="post" action="/cms/medios.php" enctype="multipart/form-data" style="margin-bottom:1.6rem">
    <div class="field">
      <label for="archivo">Imagen</label>
      <input type="file" id="archivo" name="archivo" accept="image/*">
    </div>
    <button class="btn auto" type="submit">Subir</button>
  </form>

  <h2>Archivos subidos</h2>
  <table>
    <thead><tr><th>Archivo</th><th></th></tr></thead>
    <tbody>
<?php foreach ($subidos as $s): ?>
      <tr>
        <td class="mono"><?= htmlspecialchars($s) ?></td>
        <td><a href="<?= UPLOAD_URL . '/' . rawurlencode($s) ?>" target="_blank">ver</a></td>
      </tr>
<?php endforeach; ?>
    </tbody>
  </table>
</main>
<?php helix_foot();
