<?php
session_start();
require __DIR__ . '/db.php';
require __DIR__ . '/partials.php';

$q = $_GET['q'] ?? '';
$buscar = array_key_exists('q', $_GET);

helix_head('Directorio');
?>
<div class="wrap">
  <h1>Directorio de empleados</h1>
  <p class="lead">Buscá a cualquier persona de HELIX Corp por nombre o apellido.</p>

  <form class="searchbar" method="get" action="/directorio.php">
    <input type="search" name="q" value="<?= htmlspecialchars($q) ?>" placeholder="Ej.: Ferreyra">
    <button class="btn" type="submit">Buscar</button>
  </form>

<?php
if ($buscar) {
    $sql = "SELECT nombre, apellido, area, email FROM empleados WHERE nombre LIKE '%$q%' OR apellido LIKE '%$q%' ORDER BY apellido";
    $res = mysqli_query($con, $sql);

    if (!$res) {
        echo '<div class="alert err">Error en la consulta: ' . htmlspecialchars(mysqli_error($con)) . '</div>';
    } elseif (mysqli_num_rows($res) === 0) {
        echo '<div class="alert info">Sin resultados para «' . htmlspecialchars($q) . '».</div>';
    } else {
        echo '<table><thead><tr><th>Nombre</th><th>Apellido</th><th>Área</th><th>Email</th></tr></thead><tbody>';
        while ($fila = mysqli_fetch_assoc($res)) {
            echo '<tr>'
                . '<td>' . htmlspecialchars($fila['nombre']) . '</td>'
                . '<td>' . htmlspecialchars($fila['apellido']) . '</td>'
                . '<td>' . htmlspecialchars($fila['area']) . '</td>'
                . '<td>' . htmlspecialchars($fila['email']) . '</td>'
                . '</tr>';
        }
        echo '</tbody></table>';
    }
} else {
    echo '<div class="alert info">Escribí un nombre o apellido para buscar en el directorio.</div>';
}
?>
</div>
<?php helix_foot();

