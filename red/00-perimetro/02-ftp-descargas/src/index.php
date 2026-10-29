<?php
// Centro de descargas de HELIX. El material real se sirve por FTP anónimo;
// esta página es solo la vidriera.
require __DIR__ . '/partials.php';
helix_head('Centro de Descargas');
?>
<main class="wrap">
  <h1>Centro de descargas</h1>
  <p class="lead">Instaladores y manuales del agente de monitoreo VIGÍA. Material público para clientes.</p>

  <div class="grid">
    <article class="card">
      <h3>Agente VIGÍA 2.1.0</h3>
      <p>Instalador del agente de monitoreo para Windows. Descarga desde el servidor FTP público.</p>
    </article>
    <article class="card">
      <h3>Manual de instalación</h3>
      <p>Guía paso a paso para desplegar VIGÍA en tu organización.</p>
    </article>
    <article class="card">
      <h3>Historial de versiones</h3>
      <p>Changelog y notas de cada release del agente.</p>
    </article>
  </div>

  <h2>Cómo descargar</h2>
  <p>Todos los archivos están en nuestro servidor FTP público, accesible de forma anónima:</p>
  <div class="card" style="margin-bottom:1.6rem">
    <p class="mono" style="margin:0">ftp://ftp-descargas.helixcorp.local/publico/</p>
  </div>
  <p class="muted" style="font-size:0.82rem">
    Servidor temporal mientras migramos a la nueva plataforma de descargas. Ante cualquier
    problema: soporte@helixcorp.com
  </p>
</main>
<?php helix_foot();
