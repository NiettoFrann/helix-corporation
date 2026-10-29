<?php
session_start();
require __DIR__ . '/db.php';
require __DIR__ . '/partials.php';

if (isset($_SESSION['emp'])) {
    header('Location: /panel.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $clave   = $_POST['clave'] ?? '';

    $sql = "SELECT usuario, nombre, apellido, area, email
            FROM empleados
            WHERE usuario = '$usuario' AND password_hash = MD5('$clave')";
    $res = mysqli_query($con, $sql);

    if ($res && mysqli_num_rows($res) > 0) {
        $_SESSION['emp'] = mysqli_fetch_assoc($res);
        header('Location: /panel.php');
        exit;
    }
    $error = 'Usuario o contraseña incorrectos.';
}

helix_head('Ingresar', false);
?>
<div class="login-shell">
  <div class="card login-card">
    <h1>Portal de Autogestión</h1>
    <p class="lead">Ingresá con tu usuario corporativo.</p>
    <?php if ($error): ?>
      <div class="alert err"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="post" action="/index.php">
      <div class="field">
        <label for="usuario">Usuario</label>
        <input type="text" id="usuario" name="usuario" placeholder="nombre.apellido" autofocus>
      </div>
      <div class="field">
        <label for="clave">Contraseña</label>
        <div class="pass-wrap">
          <input type="password" id="clave" name="clave" placeholder="********">
          <button type="button" class="pass-toggle" id="toggle-clave" aria-label="Mostrar contraseña" aria-pressed="false">
            <svg class="eye-open" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg class="eye-closed" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6A17.4 17.4 0 0 0 2 12s3.5 7 10 7a10.4 10.4 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>
          </button>
        </div>
      </div>
      <button class="btn" type="submit">Ingresar</button>
    </form>
    <p class="muted" style="text-align:center;margin:1.1rem 0 0;font-size:.8rem">
      ¿Problemas para ingresar? Escribí a <a href="mailto:sistemas@helixcorp.com">sistemas@helixcorp.com</a>
    </p>
  </div>
</div>
<script>
  (function () {
    var input = document.getElementById('clave');
    var btn = document.getElementById('toggle-clave');
    btn.addEventListener('click', function () {
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.setAttribute('aria-pressed', String(show));
      btn.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
      input.focus();
    });
  })();
</script>
<?php helix_foot();
