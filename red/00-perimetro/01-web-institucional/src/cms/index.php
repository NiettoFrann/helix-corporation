<?php
// Login del panel de administración de HelixCMS.
require __DIR__ . '/cms.php';
require __DIR__ . '/../partials.php';

if (cms_logueado()) {
    header('Location: /cms/panel.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = (string) ($_POST['usuario'] ?? '');
    $clave   = (string) ($_POST['clave'] ?? '');
    if (cms_login($usuario, $clave)) {
        header('Location: /cms/panel.php');
        exit;
    }
    $error = 'Usuario o contraseña incorrectos.';
}

helix_head('Acceso al panel', 'cms');
?>
<main class="login-shell">
  <form class="card login-card" method="post" action="/cms/index.php">
    <h1>Panel de administración</h1>
    <p class="lead">HelixCMS 1.4 — acceso restringido</p>

    <?php if ($error): ?>
      <div class="alert err"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <div class="field">
      <label for="usuario">Usuario</label>
      <input type="text" id="usuario" name="usuario" autofocus autocomplete="username">
    </div>

    <div class="field">
      <label for="clave">Contraseña</label>
      <div class="pass-wrap">
        <input type="password" id="clave" name="clave" autocomplete="current-password">
        <button type="button" class="pass-toggle" aria-pressed="false" aria-label="Mostrar contraseña"
                onclick="const i=document.getElementById('clave');const s=i.type==='password';i.type=s?'text':'password';this.setAttribute('aria-pressed',s);this.setAttribute('aria-label',s?'Ocultar contraseña':'Mostrar contraseña');">
          <svg class="eye-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
          <svg class="eye-closed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"/></svg>
        </button>
      </div>
    </div>

    <button class="btn" type="submit">Ingresar</button>
  </form>
</main>
<?php helix_foot();
