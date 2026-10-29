<?php
// Home del sitio institucional de HELIX Corp.
require __DIR__ . '/partials.php';
helix_head('Inicio');
?>
<section class="hero">
  <div class="eyebrow">HELIX Corporation</div>
  <h1>Blindamos el futuro digital.</h1>
  <p>Monitoreo, respuesta y consultoría en ciberseguridad para empresas que no pueden darse el lujo de improvisar.</p>
  <a class="cta" href="/servicios.php">Conocé nuestros servicios</a>
</section>

<main class="wrap">
  <div class="grid">
    <article class="card">
      <span class="ico">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </span>
      <h3>Protección perimetral</h3>
      <p>Defendemos el borde de tu red con monitoreo 24/7 y alertas en tiempo real.</p>
    </article>
    <article class="card">
      <span class="ico">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>
      </span>
      <h3>Inteligencia de amenazas</h3>
      <p>Anticipamos los riesgos antes de que lleguen a tu infraestructura.</p>
    </article>
    <article class="card">
      <span class="ico">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H4z"/><path d="M2 20h20"/></svg>
      </span>
      <h3>Respuesta a incidentes</h3>
      <p>Cuando algo pasa, nuestro equipo está del otro lado del teléfono.</p>
    </article>
  </div>

  <h2>Cultura de seguridad primero</h2>
  <p class="lead" style="max-width:52ch">
    Desde 2004 ayudamos a más de 1.200 organizaciones a dormir tranquilas. La
    seguridad no es un producto: es una forma de trabajar, y en HELIX la llevamos
    en el ADN.
  </p>
  <blockquote class="card" style="border-left:3px solid var(--system)">
    <p style="margin:0">“La confianza se construye blindando cada capa. Ese es el futuro que estamos construyendo.”</p>
    <p class="muted" style="margin:0.6rem 0 0">— Marcus Voss, CEO</p>
  </blockquote>
</main>
<?php helix_foot();
