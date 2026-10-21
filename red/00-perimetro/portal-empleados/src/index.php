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
        <input type="password" id="clave" name="clave">
      </div>
      <button class="btn" type="submit">Ingresar</button>
    </form>
    <p class="muted" style="text-align:center;margin:1.1rem 0 0;font-size:.8rem">
      ¿Problemas para ingresar? Escribí a <a href="mailto:sistemas@helixcorp.com">sistemas@helixcorp.com</a>
    </p>
  </div>
</div>
<?php helix_foot();
