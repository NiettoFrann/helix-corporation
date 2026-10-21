<?php
session_start();
require __DIR__ . '/partials.php';

if (!isset($_SESSION['emp'])) {
    header('Location: /index.php');
    exit;
}
$emp = $_SESSION['emp'];

helix_head('Mi ficha');
?>
<div class="wrap">
  <h1>Hola, <?= htmlspecialchars($emp['nombre']) ?></h1>
  <p class="lead">Esta es tu ficha de autogestión en HELIX Corp.</p>

  <div class="card">
    <dl class="dl">
      <dt>Usuario</dt><dd><?= htmlspecialchars($emp['usuario']) ?></dd>
      <dt>Nombre</dt><dd><?= htmlspecialchars($emp['nombre'] . ' ' . $emp['apellido']) ?></dd>
      <dt>Área</dt><dd><?= htmlspecialchars($emp['area']) ?></dd>
      <dt>Email</dt><dd><?= htmlspecialchars($emp['email'] ?? '—') ?></dd>
    </dl>
  </div>

  <div class="alert info" style="margin-top:1.4rem">
    Recordá actualizar tu contraseña cada 90 días. (Política vigente desde 2019.)
  </div>
</div>
<?php helix_foot();
