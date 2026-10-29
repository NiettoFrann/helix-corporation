<?php
require __DIR__ . '/partials.php';
helix_head('Servicios');
?>
<main class="wrap">
  <h1>Servicios</h1>
  <p class="lead">Un portfolio pensado para cubrir todo el ciclo de vida de la seguridad.</p>

  <div class="grid">
    <article class="card">
      <h3>VIGÍA — Monitoreo gestionado</h3>
      <p>Nuestro agente de monitoreo liviano envía alertas y un heartbeat cada 5 minutos a nuestro centro de operaciones. Visibilidad total, sin ruido.</p>
    </article>
    <article class="card">
      <h3>Consultoría y hardening</h3>
      <p>Revisamos tu infraestructura y la dejamos blindada según las mejores prácticas de la industria.</p>
    </article>
    <article class="card">
      <h3>Respuesta a incidentes</h3>
      <p>Un equipo de guardia listo para contener, investigar y recuperar.</p>
    </article>
    <article class="card">
      <h3>Capacitación</h3>
      <p>Formamos a tus equipos para que la seguridad sea parte de la rutina.</p>
    </article>
  </div>

  <h2>¿Querés una demo?</h2>
  <p class="lead" style="max-width:48ch">Escribinos y coordinamos una presentación de VIGÍA adaptada a tu organización.</p>
  <a class="cta" href="/contacto.php">Contactanos</a>
</main>
<?php helix_foot();
